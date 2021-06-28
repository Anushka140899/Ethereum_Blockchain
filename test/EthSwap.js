const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap");
const AsToken = artifacts.require("AsToken");

require('chai').use(require('chai-as-promised')).should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', (accounts) => {

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

})