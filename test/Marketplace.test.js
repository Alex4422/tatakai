const TakToken = artifacts.require('TakToken')
const CardItem = artifacts.require('CardItem')
const Marketplace = artifacts.require('Marketplace')
const Faucet = artifacts.require('Faucet')
const {
  BN,
  expectEvent, 
  expectRevert
} = require('@openzeppelin/test-helpers')
const { web3 } = require('@openzeppelin/test-helpers/src/setup');

const { expect } = require('chai');
describe('Marketplace', function () {
    let owner;
    let someOne;
    let someOne2;
    let someOne3;
    let someOne4;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        someOne = accounts[1];
        someOne2 = accounts[2];
        someOne3 = accounts[3];
        someOne4 = accounts[4];

        this.erc20token = await TakToken.new(
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

        await this.erc20token.transfer(this.faucet.address, web3.utils.toBN(50000000));
        await this.erc20token.transfer(this.marketplace.address, web3.utils.toBN(50000000));
        
        // Swap de someOne
        await this.marketplace.sendTransaction({from:someOne, value:101})
        
        // Swap de someOne2
        await this.marketplace.sendTransaction({from:someOne2, value:101})

        // Swap de someOne3
        await this.marketplace.sendTransaction({from:someOne3, value:101})
    });
    describe('Swap ETH/TAK', function() {
        it('should swap token', async function () {
            const beforeMarketplaceBalanceERC20 = await this.erc20token.balanceOf(this.marketplace.address);
            const beforeMarketplaceBalanceETH = await web3.eth.getBalance(this.marketplace.address);

            const beforeUserBalanceERC20 = await this.erc20token.balanceOf(someOne);
            const beforeUserBalanceETH = await web3.eth.getBalance(someOne);

            await this.marketplace.sendTransaction({from:someOne, value:101})

            const afterMarketplaceBalanceERC20 = await this.erc20token.balanceOf(this.marketplace.address);
            const afterMarketplaceBalanceETH = await web3.eth.getBalance(this.marketplace.address);

            const afterUserBalanceERC20 = await this.erc20token.balanceOf(someOne);
            const afterUserBalanceETH = await web3.eth.getBalance(someOne);
            
            expect(afterMarketplaceBalanceERC20.toNumber()).to.eql(beforeMarketplaceBalanceERC20-101);
            expect(parseInt(afterMarketplaceBalanceETH)).to.eql(parseInt(beforeMarketplaceBalanceETH)+101);

            expect(afterUserBalanceERC20.toNumber()).to.eql(parseInt(beforeUserBalanceERC20)+101);
        })
    })

    describe('Mint NFT', function () {
        
        it('should mint NFT', async function () {
            const receipt = await this.nft.mintNFT("https://ipfs");
            expectEvent(receipt, "ItemCreated", { tokenId: new BN(1) });
        })
        
        it('should revert if not admin', async function() {
            (await expectRevert(this.nft.mintNFT("https://ipfs", {from: someOne}), 'Ownable: caller is not the owner'));
        })
        
    })

    describe('Setting NFT Price', function() {
        it('should set nft price', async function() {
            const newPrice = 100;
            const receipt = await this.marketplace.setPrice(this.nft.address, 1, newPrice, {from:owner});
            expectEvent(receipt, "SetNewPrice", { assetId: new BN(1), price: new BN(newPrice) });
        })

        it('should revert if setPrice() caller is not nft owner', async function() {
            (await expectRevert(this.marketplace.setPrice(this.nft.address, 1, 100, {from: someOne}), 'Caller is not nft owner'));
        })

        it('should get new price', async function() {
            const newPrice = 100;
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            expect(price).to.bignumber.equal(new BN(newPrice));
        })
    })
        
    describe('Buy and transfer NFT', function () {

        it('should put card on sale', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            const receipt = await this.marketplace.putOnSale(this.nft.address, 1, {from:nftOwner});
            expectEvent(receipt, "PutOnSale", { assetId: new BN(1) });
        })

        it('should revert if putOnSale() caller is not nft owner', async function() {
            (await expectRevert(this.marketplace.putOnSale(this.nft.address, 1, {from: someOne}), 'Caller is not nft owner'));
        })

        it('should buy and transfer NFT from marketplace', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = someOne;
            const seller = await this.nft.ownerOf(1);
            
            const balance = await this.erc20token.balanceOf(buyer);
            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            await this.nft.approve(this.marketplace.address, 1, {from: seller});
            const receipt = await this.marketplace.buy(this.nft.address, 1, {from: buyer});
            const balance2 = await this.erc20token.balanceOf(buyer);
            expect(balance2).to.be.bignumber.equal(new BN(balance-price));

            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);

            expectEvent(receipt, "BuyTransaction", { assetId: new BN(1), oldOwner: seller, newOwner: buyer, price: new BN(price) });
        })

        it('should buy and transfer NFT from user', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = someOne2;
            const seller = await this.nft.ownerOf(1);

            const beforeBuyerBalance = await this.erc20token.balanceOf(buyer);

            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            await this.nft.approve(this.marketplace.address, 1, {from: seller});
            const receipt = await this.marketplace.buy(this.nft.address, 1, {from: buyer});

            const afterBuyerBlance = await this.erc20token.balanceOf(buyer);
            expect(afterBuyerBlance).to.be.bignumber.equal(new BN(beforeBuyerBalance-price));
            
            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);

            expectEvent(receipt, "BuyTransaction", { assetId: new BN(1), oldOwner: seller, newOwner: buyer, price: new BN(price) });

        })
        
        it('should remove card on sale', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            await this.marketplace.removeOnSale(this.nft.address, 1, {from:nftOwner});
        })

        it('should revert if removeOnSale() caller is not nft owner', async function() {
            (await expectRevert(this.marketplace.removeOnSale(this.nft.address, 1, {from: someOne}), 'Caller is not nft owner'));
        })

        it('should revert if user trying buy a card not for sale', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = someOne3;
            const seller = await this.nft.ownerOf(1);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            await this.nft.approve(this.marketplace.address, 1, {from: seller});
            (await expectRevert(this.marketplace.buy(this.nft.address, 1, {from: buyer}), 'Card is not for sale'));

        })
    })
    
})
