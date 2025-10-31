// We are now using the Ethers v5 stack
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@hashgraph/hardhat-hethers");
require("dotenv").config();

// Get your Testnet Private Key from the .env file
const privateKey = process.env.TESTNET_PRIVATE_KEY;

if (!privateKey) {
  console.warn(
    "CRITICAL: TESTNET_PRIVATE_KEY is not set in your .env file."
  );
  console.warn("Please get a key from https://portal.hedera.com/");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  networks: {
    hedera_testnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [privateKey],
      chainId: 296
    }
  },

  defaultNetwork: "hedera_testnet"
};