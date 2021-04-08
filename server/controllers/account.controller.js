// const db = require("../models");
const CardService = require("../services/card.services");
const UserService = require("../services/account.services");

exports.findOne = async (req, res) => {
     try {
         const user_address = req.params.address;
         const cards = await CardService.getByAddress(user_address);
         const balance = await UserService.getBalance(user_address);
         if(!cards){
            res.status(404).json("There are no cards owned yet!")
         }
         res.json({balance, cards});
       } catch (error) {
          res.status(500).json({error: error})
       }
};