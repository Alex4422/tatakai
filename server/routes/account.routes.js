module.exports = app => {
  const cards = require("../controllers/account.controller.js");
  var router = require("express").Router();

/**
 * @swagger
 * /accounts/{address}:
 *   get:
 *     summary: Retrieve cards by user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Address of NFT owner
 *         schema:
 *           type: string
*/
  router.get("/:address", cards.findOne);

  app.use('/api/accounts', router);
};