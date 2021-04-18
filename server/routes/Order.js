module.exports = app => {
    const OrderController = require("../controllers/OrderController.js");
    var router = require("express").Router();
  
    router.post("/buy", OrderController.buy);
    router.post("/sell", OrderController.sell);
    router.post("/remove", OrderController.remove);
  
    app.use('/api/order', router);
  };