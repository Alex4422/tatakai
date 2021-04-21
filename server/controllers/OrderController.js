const OrderService = require("../services/OrderService");

exports.buy = async (req, res) => {
      try {
          const id = req.body.id;
          const order = await (await OrderService).createBuyOrder(id); 
          res.json(order);
      } catch (error) {
          res.status(500).json({error})
      }
};

exports.sell = async (req, res) => {
    try {
        const id = req.body.id;
        const price = req.body.price;
        const order = await (await OrderService).createSellOrder(id, price); 
        res.json(order);
    } catch (error) {
        res.status(500).json({error})
    }
};

exports.remove = async (req, res) => {
      try {
          const id = req.body.id;
          const order = await (await OrderService).removeOrder(id); 
          res.json(order);
      } catch (error) {
          res.status(500).json({error})
      }
};
