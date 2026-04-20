export const BLINDHIRE_ADDRESS = "0x38940809D0e5a390d1d83eF3e871C0ed9A9dea1c"

export const BLINDHIRE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "applicationId", "type": "uint256" },
      { "indexed": true, "name": "roleId", "type": "uint256" },
      { "indexed": true, "name": "candidate", "type": "address" }
    ],
    "name": "ApplicationSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "applicationId", "type": "uint256" }
    ],
    "name": "MatchComputed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "roleId", "type": "uint256" },
      { "indexed": true, "name": "employer", "type": "address" }
    ],
    "name": "RolePosted",
    "type": "event"
  },
  {
    "inputs": [
      { "name": "roleId", "type": "uint256" },
      { "name": "_years", "type": "bytes32" },
      { "name": "_yearsProof", "type": "bytes" },
      { "name": "_score", "type": "bytes32" },
      { "name": "_scoreProof", "type": "bytes" }
    ],
    "name": "applyForRole",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_minYears", "type": "bytes32" },
      { "name": "_minYearsProof", "type": "bytes" },
      { "name": "_minScore", "type": "bytes32" },
      { "name": "_minScoreProof", "type": "bytes" }
    ],
    "name": "postRole",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "appId", "type": "uint256" }],
    "name": "getMatchResult",
    "outputs": [{ "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "employer", "type": "address" }],
    "name": "getEmployerRoles",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "candidate", "type": "address" }],
    "name": "getCandidateApplications",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "roleCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "applicationCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const
