const Service = require('./Service');

class FaucetService extends Service {
    constructor() {
        super();
    }
    
    async request(address, amount) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            //await this.TakTokenContract.transfer(this.FaucetContract.address, 10000, {from: accounts[0]});
            await this.FaucetContract.requestTokens(amount, {from: address});
            return true;
        }
        catch (err) {
            return err;
        }
    }
}

module.exports = (async () => {
    return await new FaucetService();
})();