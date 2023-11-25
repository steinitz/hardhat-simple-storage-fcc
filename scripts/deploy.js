// imports

const {
  ethers, 
  run, 
  network
} = require("hardhat")

const {
  SEPOLIA_CHAIN_ID, 
} = require('../constants')

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  // doesn't exist in ethers v6 - await simpleStorage.deployed()
  console.log("deployed contract to:", simpleStorage.target)
  // console.log(network.config)
  if (
    network.config.chainId === SEPOLIA_CHAIN_ID &&
    ETHERSCAN_API_KEY
  ) {
    console.log('Waiting for block confirmations...')
    await simpleStorage.deploymentTransaction().wait(5)
    const address = simpleStorage.target
    console.log('Block confirmations complete. Verifying contract at address ', address)
    await verify(address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedvalue = await simpleStorage.retrieve()
  console.log(`Updated value is: ${updatedvalue}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...", {contractAddress}, {args})
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    // if (e.message?.toLowerCase().includes("already verified")) {
    //     console.log("Already verified")
    //   } else {
      console.log(e)
    // }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })



// original
/*
// We require the Hardhat Runtime Environment explicitly here.  
// This is optional but useful for running the script in a 
// standalone fashion through `node <script>`.

// You can also run a script with `npx hardhat run <script>`. 
// If you do that, Hardhat will 
//    compile your contracts, 
//    add Hardhat Runtime Environment's members to global scope, 
//    and execute the script.

const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await 
// everywhere and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/
