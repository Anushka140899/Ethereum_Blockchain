const AsToken = artifacts.require("AsToken");

module.exports = function(deployer) {
    deployer.deploy(AsToken, 1000000); //_initialSupplys
};