module.exports = app => {
  const cards = require("../controllers/card.controller.js");
  var router = require("express").Router();

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a NFT Fighter Card.
 *     parameters:
 *       - in: query
 *         name: file
 *         required: true
 *         description: Card Image
 *         schema:
 *           type: file
*/
  router.post("/", cards.create);

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Retrieve a list of Card.
*/
  router.get("/", cards.findAll);

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
  router.get("/:id", cards.findOne);

  app.use('/api/cards', router);
};