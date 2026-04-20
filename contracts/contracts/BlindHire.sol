// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import { FHE, euint32, ebool, externalEuint32 } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract BlindHire is ZamaEthereumConfig {

    struct Role {
        address employer;
        euint32 minYears;
        euint32 minScore;
        bool active;
        string title;
        string description;
        string category;
    }

    struct Application {
        address candidate;
        uint256 roleId;
        ebool matched;
        ebool yearsOk;
        ebool scoreOk;
        bool computed;
    }

    uint256 public roleCount;
    uint256 public applicationCount;

    mapping(uint256 => Role) public roles;
    mapping(uint256 => Application) public applications;
    mapping(address => uint256[]) public employerRoles;
    mapping(address => uint256[]) public candidateApplications;

    event RolePosted(uint256 indexed roleId, address indexed employer, string title);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed roleId, address indexed candidate);
    event MatchComputed(uint256 indexed applicationId);

    function postRole(
        externalEuint32 _minYears,
        bytes calldata _minYearsProof,
        externalEuint32 _minScore,
        bytes calldata _minScoreProof,
        string calldata _title,
        string calldata _description,
        string calldata _category
    ) external returns (uint256) {
        euint32 encMinYears = FHE.fromExternal(_minYears, _minYearsProof);
        euint32 encMinScore = FHE.fromExternal(_minScore, _minScoreProof);

        FHE.allowThis(encMinYears);
        FHE.allowThis(encMinScore);

        uint256 roleId = roleCount++;
        roles[roleId] = Role({
            employer: msg.sender,
            minYears: encMinYears,
            minScore: encMinScore,
            active: true,
            title: _title,
            description: _description,
            category: _category
        });

        employerRoles[msg.sender].push(roleId);
        emit RolePosted(roleId, msg.sender, _title);
        return roleId;
    }

    function applyForRole(
        uint256 roleId,
        externalEuint32 _years,
        bytes calldata _yearsProof,
        externalEuint32 _score,
        bytes calldata _scoreProof
    ) external returns (uint256) {
        require(roles[roleId].active, "Role is not active");

        euint32 encYears = FHE.fromExternal(_years, _yearsProof);
        euint32 encScore = FHE.fromExternal(_score, _scoreProof);

        ebool yearsOk = FHE.not(FHE.lt(encYears, roles[roleId].minYears));
        ebool scoreOk = FHE.not(FHE.lt(encScore, roles[roleId].minScore));
        ebool matched = FHE.and(yearsOk, scoreOk);

        FHE.allowThis(matched);
        FHE.allowThis(yearsOk);
        FHE.allowThis(scoreOk);
        FHE.allow(matched, msg.sender);
        FHE.allow(matched, roles[roleId].employer);
        FHE.allow(yearsOk, msg.sender);
        FHE.allow(scoreOk, msg.sender);

        uint256 appId = applicationCount++;
        applications[appId] = Application({
            candidate: msg.sender,
            roleId: roleId,
            matched: matched,
            yearsOk: yearsOk,
            scoreOk: scoreOk,
            computed: true
        });

        candidateApplications[msg.sender].push(appId);
        emit ApplicationSubmitted(appId, roleId, msg.sender);
        emit MatchComputed(appId);
        return appId;
    }

    function getMatchResult(uint256 appId) external view returns (ebool) {
        require(applications[appId].computed, "Not computed yet");
        require(
            msg.sender == applications[appId].candidate ||
            msg.sender == roles[applications[appId].roleId].employer,
            "Not authorized"
        );
        return applications[appId].matched;
    }

    function getMatchDetails(uint256 appId) external view returns (ebool yearsOk, ebool scoreOk) {
        require(applications[appId].computed, "Not computed yet");
        require(msg.sender == applications[appId].candidate, "Not authorized");
        return (applications[appId].yearsOk, applications[appId].scoreOk);
    }

    function getRoleMetadata(uint256 roleId) external view returns (string memory title, string memory description, string memory category, address employer, bool active) {
        Role storage r = roles[roleId];
        return (r.title, r.description, r.category, r.employer, r.active);
    }

    function getEmployerRoles(address employer) external view returns (uint256[] memory) {
        return employerRoles[employer];
    }

    function getCandidateApplications(address candidate) external view returns (uint256[] memory) {
        return candidateApplications[candidate];
    }
}
