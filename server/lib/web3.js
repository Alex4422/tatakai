const Web3 = require('web3');
const contract = require('truffle-contract');
const artifacts = require('../../client/src/contracts/CardItem.json');
const web3 = new Web3(new Web3.providers.HttpProvider( `http://localhost:7545`));
const LMS = contract(artifacts);
LMS.setProvider(web3.currentProvider);
const instance = {
    web3,
    contract: LMS
};

module.exports = instance;