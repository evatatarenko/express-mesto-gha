/* eslint-disable linebreak-style */
const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const validation = require('../middlewares/validation');

cardsRouter.delete('/:cardId', validation.validateCardId, deleteCard);
cardsRouter.get('/', getCards);
cardsRouter.post('/', validation.validateCard, createCard);
cardsRouter.put('/:cardId/likes', validation.validateCardId, addLike);
cardsRouter.delete('/:cardId/likes', validation.validateCardId, deleteLike);

module.exports = cardsRouter;
