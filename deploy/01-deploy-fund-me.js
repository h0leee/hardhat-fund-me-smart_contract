const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
//igual a const helperConfig = require('../helper-hardat-config)
//const networkConfig = helperConfig.networkConfig
//from x import y basicamente

const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts() //Named account está na hardhat config, get permite-me ir buscá-lo
    const chainId = network.config.chainId
    // when going for localhost or hardhat network we want to use a mock
    // mocking is creating objects that simulate the behaviour of real objects

    let ethEurPriceFeedAddress
    if (chainId == 31337) { // se estivermos a usar a local network
        const ethEurAggregator = await deployments.get("MockV3Aggregator")
        ethEurPriceFeedAddress = ethEurAggregator.address
    } else {
        ethEurPriceFeedAddress = networkConfig[chainId]["ethEurPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethEurPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethEurPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]
// Module exports are the instructions that tell Node. js which bits of code (functions, objects, strings, etc.) to export from a given file so that other files are allowed to access the exported code.