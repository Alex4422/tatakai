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
    let alice;
    let bob;
    let carole;
    let dave;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        alice = accounts[1];
        bob = accounts[2];
        carole = accounts[3];
        dave = accounts[4];

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
        
        // Swap de alice
        await this.marketplace.sendTransaction({from:alice, value:10000})
        
        // Swap de bob
        await this.marketplace.sendTransaction({from:bob, value:10000})

        // Swap de carole
        await this.marketplace.sendTransaction({from:carole, value:10000})
    });
    describe('Swap token', function() {
        
        it('should swap eth/tak', async function () {
            const beforeMarketplaceBalanceERC20 = await this.erc20token.balanceOf(this.marketplace.address);
            const beforeMarketplaceBalanceETH = await web3.eth.getBalance(this.marketplace.address);

            const beforeUserBalanceERC20 = await this.erc20token.balanceOf(alice);
            const beforeUserBalanceETH = await web3.eth.getBalance(alice);

            const receipt = await this.marketplace.sendTransaction({from:alice, value:101})

            const afterMarketplaceBalanceERC20 = await this.erc20token.balanceOf(this.marketplace.address);
            const afterMarketplaceBalanceETH = await web3.eth.getBalance(this.marketplace.address);

            const afterUserBalanceERC20 = await this.erc20token.balanceOf(alice);
            const afterUserBalanceETH = await web3.eth.getBalance(alice);
            
            expect(afterMarketplaceBalanceERC20.toNumber()).to.eql(beforeMarketplaceBalanceERC20-101);
            expect(parseInt(afterMarketplaceBalanceETH)).to.eql(parseInt(beforeMarketplaceBalanceETH)+101);

            expect(afterUserBalanceERC20.toNumber()).to.eql(parseInt(beforeUserBalanceERC20)+101);
        })
        
    })

    describe('Mint NFT', function () {
        
        it('should mint NFT', async function () {
            const receipt = await this.nft.mintNFT("https://ipfs", 1000);
            await this.nft.approve(this.marketplace.address, 1, {from: owner});
            expectEvent(receipt, "ItemCreated", { tokenId: new BN(1) });
        })
        
        it('should revert if user try to mint', async function() {
            (await expectRevert(this.nft.mintNFT("https://ipfs", 1000, {from: alice}), 'Ownable: caller is not the owner'));
        })
        
        it('should revert if token uri already registered', async function() {
            (await expectRevert(this.nft.mintNFT("https://ipfs", 1000, {from: owner}), 'Already registered'));
        })
        
    })

    describe('Marketplace sell his NFT to Alice', function() {

        it('should put nft on sale and set a price', async function() {
            const newPrice = 100;
            await this.marketplace.putOnSale(this.nft.address, 1, newPrice, {from:owner});
            
            const isForSale = await this.nft.getOnSale(1, {from: owner});
            expect(isForSale).to.eql(true);
            
            const actualPrice = await this.nft.getPrice(1, {from: owner});
            expect(actualPrice).to.bignumber.equal(new BN(newPrice));
        })
        
        it('should sell and transfer NFT to Alice', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = alice;
            const seller = await this.nft.ownerOf(1);
            
            const balance = await this.erc20token.balanceOf(buyer);
            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            const receipt = await this.marketplace.buy(this.nft.address, 1, {from: buyer});
            const balance2 = await this.erc20token.balanceOf(buyer);
            expect(balance2).to.be.bignumber.equal(new BN(balance-price));

            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);

            expectEvent(receipt, "BuyTransaction", { assetId: new BN(1), oldOwner: seller, newOwner: buyer, price: new BN(price) });
        })
        
    })
        
    describe('Alice sell his NFT to Bob', function () {

        it('should put nft on sale and set a price', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            await this.marketplace.putOnSale(this.nft.address, 1, 100, {from:nftOwner});
            const isForSale = await this.nft.getOnSale(1, {from: owner});
            await this.nft.approve(this.marketplace.address, 1, {from: nftOwner});
            expect(isForSale).to.eql(true);
        })

         it('should buy NFT from user', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = bob;
            const seller = await this.nft.ownerOf(1);

            const beforeBuyerBalance = await this.erc20token.balanceOf(buyer);

            const beforeGetNftOwner = await this.nft.ownerOf(1);
            expect(beforeGetNftOwner).to.eql(seller);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            const receipt = await this.marketplace.buy(this.nft.address, 1, {from: buyer});

            const afterBuyerBlance = await this.erc20token.balanceOf(buyer);
            expect(afterBuyerBlance).to.be.bignumber.equal(new BN(beforeBuyerBalance-price));
            
            const afterGetNftOwner = await this.nft.ownerOf(1);
            expect(afterGetNftOwner).to.eql(buyer);

            expectEvent(receipt, "BuyTransaction", { assetId: new BN(1), oldOwner: seller, newOwner: buyer, price: new BN(price) });

        })
    })
    
    describe('Put/Remove NFT on sale', function() {
                
        it('should revert if putOnSale() caller is not nft owner', async function() {
            (await expectRevert(this.marketplace.putOnSale(this.nft.address, 1, 100, {from: alice}), 'Caller is not nft owner'));
        })     
        
        it('should put nft on sale and set a price', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            await this.marketplace.putOnSale(this.nft.address, 1, 100, {from:nftOwner});
            
            const isForSale = await this.nft.getOnSale(1, {from: owner});
            await this.nft.approve(this.marketplace.address, 1, {from: nftOwner});
            
            expect(isForSale).to.eql(true);
        })
        
        it('should revert if removeOnSale() caller is not nft owner', async function() {
            (await expectRevert(this.marketplace.removeOnSale(this.nft.address, 1, {from: alice}), 'Caller is not nft owner'));
        })
        
        it('should remove card on sale', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            await this.marketplace.removeOnSale(this.nft.address, 1, {from:nftOwner});
            
            const isForSale = await this.nft.getOnSale(1, {from: owner});
            await this.nft.approve(this.marketplace.address, 1, {from: nftOwner});
            
            expect(isForSale).to.eql(false);
        })


        it('should revert if user trying buy a card not for sale', async function () {
            const nft = await this.nft.tokens(1);
            const price = nft.price;
            const buyer = carole;
            const seller = await this.nft.ownerOf(1);
            
            await this.erc20token.approve(this.marketplace.address, price, {from: buyer});
            await this.nft.approve(this.marketplace.address, 1, {from: seller});
            (await expectRevert(this.marketplace.buy(this.nft.address, 1, {from: buyer}), 'Card is not for sale'));

        })
        
        it('should re-put card on sale with new price', async function() {
            const nftOwner = await this.nft.ownerOf(1);
            await this.marketplace.putOnSale(this.nft.address, 1, 100, {from:nftOwner});
            const isForSale = await this.nft.getOnSale(1, {from: owner});
            expect(isForSale).to.eql(true);
        })
    })
    
})
