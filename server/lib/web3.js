const Web3 = require('web3');
const contract = require('truffle-contract');
const CardItem = require('../../client/src/contracts/CardItem.json');
const Faucet = require('../../client/src/contracts/Faucet.json');
const TakToken = require('../../client/src/contracts/TakToken.json');
const Marketplace = require('../../client/src/contracts/Marketplace.json');
const web3 = new Web3(new Web3.providers.HttpProvider( `http://localhost:7545`));
const LMS = contract(CardItem);
const FaucetInstance = contract(Faucet);
const TakTokenInstance = contract(TakToken);
const MarketplaceInstance = contract(Marketplace);
LMS.setProvider(web3.currentProvider);
TakTokenInstance.setProvider(web3.currentProvider);
FaucetInstance.setProvider(web3.currentProvider);
MarketplaceInstance.setProvider(web3.currentProvider);
const instance = {
    web3,
    contract: LMS,
    faucet: FaucetInstance,
    taktoken: TakTokenInstance,
    marketplace: MarketplaceInstance
};

module.exports = instance;