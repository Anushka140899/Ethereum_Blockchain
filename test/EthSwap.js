const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap");
const AsToken = artifacts.require("AsToken");

require('chai').use(require('chai-as-promised')).should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, investor]) => {

    let token, ethswap

    before(async() => {

        token = await AsToken.new()
        ethswap = await EthSwap.new(token.address)
        await token.transfer(ethswap.address, tokens('1000000'))

    })

    describe('AsToken deployment', async() => {

        it('name of the contract', async() => {

            const name = await token.name()
            assert.equal(name, 'ASToken')
        })
    })

    describe('Ethswap deployment', async() => {

        it('name of the contract', async() => {

            const name = await ethswap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })

        it('Contract has tokens', async() => {

            let balance = await token.balanceOf(ethswap.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('buyTokens()', async() => {

        let result

        before(async() => {
            result = await ethswap.buyTokens({ from: investor, value: tokens('1') })
        })

        it('Allows the user to purchase tokens from ethSwap ', async() => {

            //check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            //Check ethswap token balance after purchase
            let ethSwapBalance = await token.balanceOf(ethswap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))

            //Check the ether balance of ethswap
            ethSwapBalance = await web3.eth.getBalance(ethswap.address)
            assert.equal(ethSwapBalance, tokens('1'));

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100'))
            assert.equal(event.rate.toString(), '100')

        })
    })

    describe('SellTokens()', async() => {

        let result
        before(async() => {
            //Investor mut approve the tokens
            await token.approve(ethswap.address, tokens('100'), { from: investor })
                //The tokens are sold
            result = await ethswap.sellTokens(tokens('100'), { from: investor })
        })
        it('allows user to instantly sell tokens to ethswap', async() => {

            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), '0');

            let ethSwapBalance = await token.balanceOf(ethswap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))

            ethSwapBalance = await web3.eth.getBalance(ethswap.address)
            assert.equal(ethSwapBalance.toString(), '0')

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100'))
            assert.equal(event.rate.toString(), '100')

            //Investor can't seel more tokens than he has

            await ethswap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
        })
    })
})