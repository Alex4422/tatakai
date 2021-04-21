const Service = require('./Service');

class FaucetService extends Service {
    constructor() {
        super();
    }
    
    async request(address) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            await this.FaucetContract.requestTokens({from: address});
            return true;
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = (async () => {
    return await new FaucetService();
})();