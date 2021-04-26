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
    let alice;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        alice = accounts[1];

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
            { from: owner }
        )

        await this.erc20token.transfer(this.faucet.address, web3.utils.toBN(50000000));
    });

    describe('Request TAK Token', function () {
                
        it('should send tak token to owner', async function () {
            const receipt = await this.faucet.requestTokens({from:owner});
            expectEvent(receipt, "Withdrawal", { to: owner });
        })
       
        it('should revert if user not waited to request tak token', async function() {
            (await expectRevert(this.faucet.requestTokens({from: owner}), "You have to wait 30 minutes!"));
        });
        
        it('should revert if alice request tak token', async function () {
            (await expectRevert(this.faucet.requestTokens({from: alice}), "caller is not the owner"));
        })
 
    })
    
})
