import pkg from "hardhat"
const { ethers } = pkg

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Account balance:", ethers.formatEther(balance), "ETH")

  const BlindHire = await ethers.getContractFactory("BlindHire")
  console.log("Deploying BlindHire...")

  const blindHire = await BlindHire.deploy()
  await blindHire.waitForDeployment()

  const address = await blindHire.getAddress()
  console.log("BlindHire deployed to:", address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
