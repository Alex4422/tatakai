module.exports = app => {
  const CardController = require("../controllers/CardController.js");
  var router = require("express").Router();

  router.post("/", CardController.create);
  router.get("/", CardController.findAll);
  router.get("/:id", CardController.findOne);

  app.use('/api/cards', router);
};