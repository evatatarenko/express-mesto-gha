/* eslint-disable linebreak-style */
const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  try {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          throw new Error('NotFoundError');
        }
        res.send({ data: card });
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } catch (err) {
    if (req.params.cardId.length !== 24) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    }
  }
};

const addLike = (req, res) => {
  try {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new Error('NotFoundError');
        }
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } catch (err) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

const deleteLike = (req, res) => {
  try {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } catch (err) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};
