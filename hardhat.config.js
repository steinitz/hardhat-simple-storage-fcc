require("@nomicfoundation/hardhat-toolbox")
// included in the above - require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require('./tasks/block-number')

const {
  SEPOLIA_CHAIN_ID, 
} = require('./constants')
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_KEY = process.env.SEPOLIA_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // not needed but more explicit
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_KEY],
      chainId: SEPOLIA_CHAIN_ID,
    },
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners()

//   for (const account of accounts) {
//     console.log(account.address)
//   }
// })
