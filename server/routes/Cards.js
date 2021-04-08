module.exports = app => {
  const CardController = require("../controllers/CardController.js");
  var router = require("express").Router();

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a NFT Fighter Card.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Card Name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: true
 *         description: Card Description
 *         schema:
 *           type: string
 *       - in: query
 *         name: file
 *         required: true
 *         description: Card Image
 *         schema:
 *           type: file
*/
  router.post("/", CardController.create);

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Retrieve a list of Card.
*/
  router.get("/", CardController.findAll);

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Retrieve a single Card.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Token ID
 *         schema:
 *           type: integer
*/
  router.get("/:id", CardController.findOne);

/**
 * @swagger
 * /cards/buy:
 *   post:
 *     summary: Buy a Card.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Card ID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: address
 *         required: true
 *         description: Buyer address
 *         schema:
 *           type: string
*/
  router.post("/buy", CardController.buy);

  app.use('/api/cards', router);
};