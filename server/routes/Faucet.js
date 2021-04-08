module.exports = app => {
  const FaucetController = require("../controllers/FaucetController");
  var router = require("express").Router();
  
  router.post("/", FaucetController.create);

  app.use('/api/faucet', router);
};