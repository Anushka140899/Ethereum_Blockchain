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
            return tokenInstance.transfer.call(accounts[1], 999999999); //trnasfer.call doesnt trigger transaction
        }).then(assert.fail).catch(function(error) {

            assert(error.toString().indexOf('revert') >= 0, "Error message must contain revert"); //to_index needs a to string
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function(receipt) {

            assert.equal(receipt.logs.length, 1, "Triggers 1 event");
            assert.equal(receipt.logs[0].event, 'Transfer', 'Transfer event should be triggered');
            assert.equal(receipt.logs[0].args._from, accounts[0], "The account tokens are transferred from");
            assert.equal(receipt.logs[0].args._to, accounts[1], "The account tokens are transferred to");
            assert.equal(receipt.logs[0].args._value, 250000, "The amount transferred");

            return tokenInstance.balanceOf(accounts[1]);

        }).then(function(balance) {

            assert.equal(balance.toNumber(), 250000, "The amount is added to the account");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {

            assert.equal(balance.toNumber(), 750000, "The amount has been deducted");
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, "Returns true");
        });

    });






})