/* eslint-disable linebreak-style */
const Card = require('../models/card');

const Forbidden = require('../Errors/forbidden');
const NotFound = require('../Errors/notFound');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .populate([{ path: 'owner', model: 'user' }])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка была удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Вы не можете удалить карточку другого пользователя');
      }
      Card.findByIdAndDelete({ _id })
        .populate([{ path: 'owner', model: 'user' }])
        .then((cardDeleted) => {
          res.send({ data: cardDeleted });
        });
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .populate([{ path: 'owner', model: 'user' }, { path: 'likes', model: 'user' }])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена 404');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .populate([{ path: 'owner', model: 'user' }, { path: 'likes', model: 'user' }])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена 404');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};
