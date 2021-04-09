module.exports = app => {
  const AccountController = require("../controllers/AccountController.js");
  var router = require("express").Router();

  router.get("/:address", AccountController.findOne);

  app.use('/api/accounts', router);
};