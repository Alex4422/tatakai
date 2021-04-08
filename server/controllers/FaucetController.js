const FaucetService = require('../services/FaucetService');

exports.create = async (req, res) => {
    try {
        await (await FaucetService).request(req.body.address);
        res.status(200).json({message: "Your request has been processed."});
    } catch (error) {
        res.status(500).json({error})
    }
};