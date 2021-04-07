// const db = require("../models");
const CardService = require("../services/card.services");

exports.findOne = async (req, res) => {
     try {
         const user_address = req.params.address;
         const cards = await CardService.getCardsOf(user_address);
         if(!cards){
            res.status(404).json("There are no cards owned yet!")
         }
         res.json(cards);
       } catch (error) {
          res.status(500).json({error: error})
       }
};