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

const { expect } = require('chai');
describe('Marketplace', function () {
    let owner;
    let someOne;
    let someOne2;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        someOne = accounts[1];
        someOne2 = accounts[2];

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

        it('should buy and transfer NFT from marketplace', async function () {
            const price = 100;
            const buyer = someOne;
            const seller = this.marketplace.address;
            
            await this.faucet.requestTokens({from: buyer});
            const balance = await this.erc20token.balanceOf(buyer);
            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(seller, price, {from: buyer});
            await this.marketplace.buy(this.nft.address, 1, price, {from: buyer});
            const balance2 = await this.erc20token.balanceOf(buyer);
            expect(balance2).to.be.bignumber.equal(new BN(balance-price));

            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);
        })

        it('should buy and transfer NFT from user', async function () {
            const price = 100;
            const buyer = someOne2;
            const seller = someOne;
            
            await this.faucet.requestTokens({from: buyer});

            const beforeBuyerBalance = await this.erc20token.balanceOf(buyer);

            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer}); // marketplace approuve les transferts
            await this.nft.approve(this.marketplace.address, 1, {from: seller});
            await this.marketplace.buy(this.nft.address, 1, price, {from: buyer});

            const afterBuyerBlance = await this.erc20token.balanceOf(buyer);
            expect(afterBuyerBlance).to.be.bignumber.equal(new BN(beforeBuyerBalance-price));
            
            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);
        })
    })
    
})
