module.exports = app => {
  const faucet = require("../controllers/faucet.controller.js");
  var router = require("express").Router();

/**
 * @swagger
 * /faucet:
 *   post:
 *     summary: Request Tak token
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: User address
 *         schema:
 *           type: string
*/
  router.post("/", faucet.request);

  app.use('/api/faucet', router);
};