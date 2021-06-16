const { assert } = require("chai");

var AsToken = artifacts.require("AsToken");


contract('AsToken', function(accounts) {
    var tokenInstance;

    it('Initializes the contract with correct values', function() {

        return AsToken.deployed().then(function(instance) {

            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {

            assert.equal(name, 'ASToken', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'AS', 'Has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'ASToken version v1.0', 'Has the correct standard');
        });
    })

    it('Allocates the initial supply upon deployment', function() {

        return AsToken.deployed().then(function(instance) {

            tokenInstance = instance;
            return tokenInstance.totalSupply();

        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'It allocates the initial supply to the admin');
        });
    });

    it("Transfers the token ownership", function() {

        return AsToken.deployed().then(function(instance) {

            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999999999);
        }).then(assert.fail).catch(function(error) {

            assert(error.toString().indexOf('revert') >= 0, "Error message must contain revert"); //to_index needs a to string

        });

    });






})