const Faucet = artifacts.require('Faucet')
const TakToken = artifacts.require('TakToken')
const Marketplace = artifacts.require('Marketplace')
const {
  BN,
  expectEvent, 
  expectRevert,
} = require('@openzeppelin/test-helpers')
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect } = require('chai');

describe('Faucet', function () {
    let owner;
    let someOne;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        someOne = accounts[1];

        this.erc20token = await TakToken.new(
            "Tatakai", 
            "TAK", 
            { from: owner }
        )
        
        this.marketplace = await Marketplace.new(
            this.erc20token.address,
            { from: owner }
        )

        this.faucet = await Faucet.new(
            this.erc20token.address, 
            this.marketplace.address,
            { from: owner }
        )
    });

    describe('Request TAK Token', function () {

        it('should send tokens to faucet fill up', async function () {
            const amount = 10000000;
            const beforeUserBalance = await this.erc20token.balanceOf(owner);
            const receipt = await this.erc20token.transfer(this.faucet.address, amount);
            const afterUserBalance = await this.erc20token.balanceOf(owner);
            expect(BigInt(afterUserBalance)).to.eql(BigInt(beforeUserBalance - amount));
        })
        
        // it('should give owner tak token', async function () {
        //     const requestTokenAmount = 1000;
        //     const beforeUserBalance2 = await this.erc20token.balanceOf(owner);
        //     // console.log(beforeUserBalance2)
        //     const receipt = await this.faucet.requestTokens(requestTokenAmount, {from: owner});
        //     const afterUserBalance2 = await this.erc20token.balanceOf(owner);
        //     // expect(new BN(afterUserBalance2)).to.eql(new BN(beforeUserBalance2 + requestTokenAmount));
        //     expectEvent(receipt, "Withdrawal", { to: owner });
        // })
        
        it('should revert if user request tak token', async function () {
            const requestTokenAmount = 10000;
            expectRevert(this.faucet.requestTokens(requestTokenAmount, {from: someOne}), "caller is not the owner");
        })
    
        it('should revert if user not waited', async function() {
            expectRevert(this.faucet.requestTokens(10000, {from: someOne}), "You have to wait 30 minutes!");
        });
    })
    
})
