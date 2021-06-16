const { assert } = require("chai");

var AsToken = artifacts.require("AsToken");


contract('AsToken', function(accounts) {
    var tokenInstance;
    var fromAccount;
    var toAccount;
    var spendingAccount;

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
    });

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

    it("Approves the transfer", function() {
        return AsToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, "Returns true");
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Triggers one event");
            assert.equal(receipt.logs[0].event, 'Approval', "Triggers approval event");
            assert.equal(receipt.logs[0].args._owner, accounts[0], "Owner of the tokens");
            assert.equal(receipt.logs[0].args._spender, accounts[1], "Spender of the tokens");
            assert.equal(receipt.logs[0].args._value, 100, "Valueof the tokens");
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance, 100, "The number of token allowed");
        });
    });

    it('handles delegated token transfers', function() {
        return AsToken.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
            // Transfer some tokens to fromAccount
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        }).then(function(receipt) {
            // Approve spendingAccount to spend 10 tokens form fromAccount
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
        }).then(function(receipt) {
            // Try transferring something larger than the sender's balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
        }).then(assert.fail).catch(function(error) {
            assert(error.message, 'cannot transfer value larger than balance');
            // Try transferring something larger than the approved amount
            return tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
        }).then(assert.fail).catch(function(error) {
            assert(error.message, 'cannot transfer value larger than approved amount');
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
        }).then(function(success) {
            assert.equal(success, true);
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
        }).then(function(receipt) {

            assert.equal(receipt.logs.length, 1, "Triggers one event");
            assert.equal(receipt.logs[0].event, 'Transfer', "Triggers approval event");
            assert.equal(receipt.logs[0].args._from, fromAccount, "Owner of the tokens");
            assert.equal(receipt.logs[0].args._to, toAccount, "Receiver of the tokens");
            assert.equal(receipt.logs[0].args._value, 10, "Valueof the tokens");
            return tokenInstance.balanceOf(fromAccount);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 90, "10 coins are deducted");
            return tokenInstance.balanceOf(toAccount);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 10, "10 coins are added to the account");
            return tokenInstance.allowance(fromAccount, spendingAccount);
        }).then(function(allowance) {
            assert.equal(allowance, 0, 'deducts amount from the allowance');
        });
    });
})