require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3');
const contract = require('truffle-contract');
const CardItemJson = require('../../client/src/contracts/CardItem.json');
const FaucetJson = require('../../client/src/contracts/Faucet.json');
const TakTokenJson = require('../../client/src/contracts/TakToken.json');
const MarketplaceJson = require('../../client/src/contracts/Marketplace.json');

const provider = new Web3.providers.WebsocketProvider("wss://ws-matic-mumbai.chainstacklabs.com");
const web3 = new Web3(new HDWalletProvider(process.env.MNEMONIC , provider));

const CardItemContract = contract(CardItemJson);
const FaucetContract = contract(FaucetJson);
const TakTokenContract = contract(TakTokenJson);
const MarketplaceContract = contract(MarketplaceJson);

CardItemContract.setProvider(web3.currentProvider);
TakTokenContract.setProvider(web3.currentProvider);
FaucetContract.setProvider(web3.currentProvider);
MarketplaceContract.setProvider(web3.currentProvider);

const instance = {
    web3,
    CardItemContract,
    FaucetContract,
    TakTokenContract,
    MarketplaceContract
};

module.exports = instance;