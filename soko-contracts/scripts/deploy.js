const hre = require("hardhat");

async function main() {
  // --- CONFIGURATION ---
  const sewhTokenAddress = "0x00000000000000000000000000000000006bab58";
  const usdcTokenAddress = "0x0000000000000000000000000000000000016a44";
  // ---------------------

  console.log("Deploying SokoMarketplaceV2 contract (Ethers v5)...");
  console.log(`Using SEWH Token (EVM Address): ${sewhTokenAddress}`);
  console.log(`Using USDC Token (EVM Address): ${usdcTokenAddress}`);

  const SokoMarketplaceV2 = await hre.ethers.getContractFactory("SokoMarketplaceV2");

  const sokoMarketplace = await SokoMarketplaceV2.deploy(sewhTokenAddress, usdcTokenAddress);

  // --- Ethers v5 syntax ---
  await sokoMarketplace.deployed(); 
  const deployedAddress = sokoMarketplace.address;
  // --- End Ethers v5 syntax ---

  console.log(`✅ SokoMarketplaceV2 deployed successfully to address: ${deployedAddress}`);
  console.log("---");
  console.log("ACTION REQUIRED:");
  console.log("1. Copy this new address.");
  console.log("2. Paste it into soko-frontend/src/config.js as your CONTRACT_ADDRESS.");
  console.log(`3. Paste the $SEWH$ address ("${sewhTokenAddress}") into config.js as SEWH_TOKEN_ADDRESS.`);
  console.log("---");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});