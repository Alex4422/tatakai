const instance = require("../config/web3");

module.exports = 
class Service {
    constructor() {
        return (async () => {
            this.CardItemContract = await instance.CardItemContract.deployed();
            this.TakTokenContract = await instance.TakTokenContract.deployed();
            this.MarketplaceContract = await instance.MarketplaceContract.deployed();
            this.FaucetContract = await instance.FaucetContract.deployed();
            this.web3 = instance.web3;
            return this;
        })();
    }
}