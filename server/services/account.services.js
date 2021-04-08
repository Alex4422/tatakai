const instance = require("../lib/web3");
const web3 = instance.web3;

module.exports = class CardService {
    static async getBalance(address) {
        try {
            const taktoken = await instance.taktoken.deployed();
            const balance = await taktoken.balanceOf(address);
            return balance.toString();
        }
        catch (err) {
            return err;
        }
    }
}