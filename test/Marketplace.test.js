const TakToken = artifacts.require('TakToken')
const CardItem = artifacts.require('CardItem')
const Marketplace = artifacts.require('Marketplace')
const Faucet = artifacts.require('Faucet')
const {
  BN,
  expectEvent, 
  expectRevert,
} = require('@openzeppelin/test-helpers')
const { web3 } = require('@openzeppelin/test-helpers/src/setup');

describe('Marketplace', function () {
    let owner;
    let someOne;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        someOne = accounts[1];

        this.erc20token = await TakToken.new(
            web3.utils.toBN(1000000000000000000), 
            "Tatakai", 
            "TAK", 
            { from: owner }
        )

        this.marketplace = await Marketplace.new(
            this.erc20token.address, 
            { from: owner }
        )
        this.nft = await CardItem.new(
            "Token Test",
            "TEST",
            this.marketplace.address, 
            { from: owner }
        )
        
        this.faucet = await Faucet.new(
            this.erc20token.address, 
            { from: owner }
        )
        await this.erc20token.transfer(this.faucet.address, web3.utils.toBN(1000000000000000000));
        
    });

    describe('Mint, buy and transfer NFT', function () {

        it('should mint NFT', async function () {
            const receipt = await this.nft.mintNFT("https://ipfs");
            expectEvent(receipt, "ItemCreated", { tokenId: new BN(1) });
        })

        it('should buy and transfer NFT', async function () {
            const price = 100;
            await this.faucet.requestTokens({from: someOne});
            const balance = await this.erc20token.balanceOf(someOne);
            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(this.marketplace.address);
            this.erc20token.approve(this.marketplace.address, price, {from: someOne});
            await this.marketplace.buy(this.nft.address, someOne, 1, price, {from: someOne});
            const balance2 = await this.erc20token.balanceOf(someOne);
            expect(balance2).to.be.bignumber.equal(new BN(balance-price));

            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(someOne);
        })
    })
    
})
