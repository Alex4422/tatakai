require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3');
const contract = require('truffle-contract');
const CardItemJson = require('../../client/src/contracts/CardItem.json');
const FaucetJson = require('../../client/src/contracts/Faucet.json');
const TakTokenJson = require('../../client/src/contracts/TakToken.json');
const MarketplaceJson = require('../../client/src/contracts/Marketplace.json');
// const web3 = new Web3(new HDWalletProvider( process.env.MNEMONIC, `https://rpc-mumbai.maticvigil.com/v1/e6115eb8f8eac2bd2b347f2890455f74519ff7a9`));
const web3 = new Web3(new HDWalletProvider({
    mnemonic: {
      phrase: process.env.MNEMONIC
    },
    providerOrUrl: "https://rpc-mumbai.maticvigil.com/v1/e6115eb8f8eac2bd2b347f2890455f74519ff7a9",
    numberOfAddresses: 1,
    shareNonce: true,
    derivationPath: "m/44'/1'/0'/0/"
  }));
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