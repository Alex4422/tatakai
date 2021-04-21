const CardService = require("../services/CardService");
const AccountService = require("../services/AccountService");

exports.findOne = async (req, res) => {
   try {
      const user_address = req.params.address;
      const cards = await (await CardService).getByAddress(user_address);
      const balance = await (await AccountService).getBalance(user_address);
      if(!cards){
         res.status(404).json("There are no cards owned yet!")
      }
      res.json({balance, cards});
   } catch (error) {
      res.status(500).json({error})
   }
};