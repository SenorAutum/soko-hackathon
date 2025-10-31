// scripts/deploy-ethers.js

// We need the ethers library and the dotenv library
const { ethers } = require("ethers");
require("dotenv").config({ path: '../.env' }); // Adjust path to the root .env file

// Import the compiled contract artifacts
const contractJson = require("../artifacts/contracts/SokoMarketplaceV2.sol/SokoMarketplaceV2.json");

async function main() {
    // --- CONFIGURATION ---
    // 1. Get the raw private key from your .env file
    const privateKey = process.env.MY_PRIVATE_KEY_RAW;
    if (!privateKey) {
        throw new Error("MY_PRIVATE_KEY_RAW is not set in the .env file");
    }

    // 2. Define the constructor arguments for your contract
    const sewhTokenAddress = "0x00000000000000000000000000000000006bbd98"; // Your SEWH Token EVM Address
const usdcTokenAddress = "0x000000000000000000000000000000000006f8aa"; // Hedera Testnet USDC EVM Address

    
    // --- END CONFIGURATION ---

    console.log("🚀 Starting direct deployment with ethers.js...");

    // 1. Set up the connection to the Hedera Testnet
    const provider = new ethers.JsonRpcProvider("https://testnet.hashio.io/api");

    // 2. Create a wallet instance from your private key
    const wallet = new ethers.Wallet(`0x${privateKey}`, provider);

    // 3. Get the contract factory using the ABI and bytecode
    const SokoMarketplace = new ethers.ContractFactory(
        contractJson.abi,
        contractJson.bytecode,
        wallet
    );

    console.log(`Deploying SokoMarketplaceV2 with arguments:`);
    console.log(`  - SEWH Token: ${sewhTokenAddress}`);
    console.log(`  - USDC Token: ${usdcTokenAddress}`);
    
    // 4. Deploy the contract with its constructor arguments
    const sokoMarketplace = await SokoMarketplace.deploy(sewhTokenAddress, usdcTokenAddress);

    // 5. Wait for the deployment transaction to be confirmed
    await sokoMarketplace.waitForDeployment();
    
    const contractAddress = await sokoMarketplace.getAddress();
    console.log(`✅ Contract deployed successfully!`);
    console.log(`📄 Contract Address: ${contractAddress}`);
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});