 const { assert } = require("chai") // nestes testes não precisamos da mock porque vamos estar a testar numa testnet
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

// o que faz ?
// let variable = false
// let somevar = variable ? 'yes' : 'no'
// if (variable) {somevar = 'yes'} else {somevar = 'no'} estas dauas últimas fazem o mesmo 

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", function () { // isto só vai correr se não estivermos numa development chain
          let deployer
          let fundMe
          const sendValue = ethers.utils.parseEther("0.1")
          beforeEach(async () => { 
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              const fundTxResponse = await fundMe.fund({ value: sendValue })
              await fundTxResponse.wait(1)
              const withdrawTxResponse = await fundMe.withdraw()
              await withdrawTxResponse.wait(1)

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
