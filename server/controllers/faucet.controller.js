const instance = require("../lib/web3");
const uploadFile = require("../middleware/upload");
const web3 = instance.web3;

exports.request = async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const faucet = await instance.faucet.deployed();
        const taktoken = await instance.taktoken.deployed();
        await taktoken.transfer(faucet.address, 10000, {from: accounts[0]});
        const requestTokens = await faucet.requestTokens({from: req.body.address});
        res.status(200).json({message: "Your request has been processed."});
    } catch (error) {
          res.status(500).json({error})
    }
};