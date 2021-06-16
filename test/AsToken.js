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
})