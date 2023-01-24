const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    5: {
        name: "goerli",
        ethEurPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    137: {
        name: 'polygon',
        ethEurPriceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
    }
}

const developmentChains = ["hardhat", "localhost"] // estas irão precisar de mocks pq são local

module.exports = {
    networkConfig,
    developmentChains,
}
