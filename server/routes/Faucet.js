module.exports = app => {
  const FaucetController = require("../controllers/FaucetController");
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
  router.post("/", FaucetController.create);

  app.use('/api/faucet', router);
};