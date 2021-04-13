const uploadFile = require("../middleware/UploadMiddleware");
const CardService = require("../services/CardService");

exports.create = async (req, res) => {
      try {
        await uploadFile(req, res);
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
        const data = {
          name: req.body.name || "",
          age: req.body.age || "",
          nationality: req.body.nationality || "",
          season: req.body.saison || "",
          type: req.body.type || "",
          price: req.body.price || 1,
          isForSale: req.body.isForSale || 0
        };
        const card = await (await CardService).mint(req.file, data)
        res.json(card);
      } catch (err) {
        res.status(500).send({
          error: err,
        });
      }
};

exports.findAll = async (req, res) => {
      try {
        const marketplace = await (await CardService).MarketplaceContract.address;
        const cards = await (await CardService).getOnSale();
        if(!cards){
            res.status(404).json({error: "There are no cards minted yet!"})
        }
        res.json(cards);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.findOne = async (req, res) => {
      try {
        const id = req.params.id;
        const card = await (await CardService).getById(id);
        if(!card){
            res.status(404).json({error: "No exists!"})
        }
        res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.buy = async (req, res) => {
      try {
          const id = req.body.id;
          const buyer = req.body.address;
          const card = await (await CardService).buyFrom(buyer, id); 
          res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.removeSale = async (req, res) => {
      try {
          const id = req.body.id;
          const card = await (await CardService).removeOrder(id); 
          res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.putForSale = async (req, res) => {
      try {
          const id = req.body.id;
          const price = req.body.price;
          const card = await (await CardService).createOrder(id, price); 
          res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};