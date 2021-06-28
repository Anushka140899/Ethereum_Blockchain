const EthSwap = artifacts.require("EthSwap");
const AsToken = artifacts.require("AsToken");

module.exports = async function(deployer) {

    await deployer.deploy(AsToken); //_initialSupplys
    const token = await AsToken.deployed()


    await deployer.deploy(EthSwap, token.address);
    const ethSwap = await EthSwap.deployed()



    await token.transfer(ethSwap.address, '1000000')
};