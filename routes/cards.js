/* eslint-disable linebreak-style */
const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.route('/')
  .get(getCards)
  .post(createCard);

cardsRouter.route('/:cardId').delete(deleteCard);

cardsRouter.route('/:cardId/likes').put(addLike);

cardsRouter.route('/:cardId/likes').delete(deleteLike);

module.exports = cardsRouter;
