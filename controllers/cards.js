/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send({ data: card }))
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

// const deleteCard = (req, res) => {
//   try {
//     Card.findByIdAndRemove(req.params.cardId)
//       .then((card) => {
//         if (!card) {
//           throw new Error('NotFoundError');
//         }
//         res.send({ data: card });
//       })
//       .catch((err) => {
//         console.log(err.name);
//         if (err.name === 'CastError') {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else {
//           res.status(404).send({ message: 'Карточка не найдена' });
//         }
//       });
//   } catch (err) {
//     if (req.params.cardId.length !== 24) {
//       res.status(400).send({ message: 'Переданы некорректные данные' });
//     }
//   }
// };

const deleteCard = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
      res.status(400).send({ message: 'Неверный id' });
      return;
    }

    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }

    res.send({ data: card });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Карточка не найдена' });
    } else {
      console.error(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

// const addLike = (req, res) => {
//   try {
//     Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $addToSet: { likes: req.user._id } },
//       { new: true },
//     )
//       .then((card) => {
//         console.log(req.params.cardId);
//         if (!card) {
//           throw new Error('NotFoundError');
//         }
//         if (req.params.cardId.length !== 24) {
//           throw new Error('Неверный id');
//         }
//         res.send({ data: card });
//       })
//       .catch((err) => {
//         if (err.name === 'CastError') {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else if (err.name === 'ValidationError') {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else if (err.message === 'NotFoundError') {
//           res.status(404).send({ message: 'Карточка не найдена' });
//         } else if (err.message === 'Неверный id') {
//           console.log(err.message);
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else {
//           console.log(err.name);
//           res.status(500).send({ message: 'На сервере произошла ошибка' });
//         }
//       });
//   } catch (err) {
//     res.status(400).send({ message: 'Переданы некорректные данные' });
//   }
// };

const addLike = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
      res.status(400).send({ message: 'Неверный id' });
      return;
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }

    res.send({ data: card });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else {
      console.error(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

// const deleteLike = (req, res) => {
//   try {
//     Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $pull: { likes: req.user._id } },
//       { new: true },
//     )
//       .then((card) => {
//         console.log(req.params.cardId);
//         if (req.params.cardId.length !== 24) {
//           throw new Error('Неверный id');
//         } else if (!card) {
//           throw new Error('NotFoundError');
//         }
//         res.send({ data: card });
//       })
//       .catch((err) => {
//         if (err.name === 'CastError' && req.params.cardId.length !== 24) {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else if (err.name === 'CastError') {
//           res.status(404).send({ message: 'Карточка не найдена' });
//         } else if (err.name === 'ValidationError') {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else if (err.message === 'NotFoundError') {
//           res.status(404).send({ message: 'Карточка не найдена' });
//         } else if (err.message === 'Неверный id') {
//           res.status(400).send({ message: 'Переданы некорректные данные' });
//         } else {
//           res.status(500).send({ message: 'На сервере произошла ошибка' });
//         }
//       });
//   } catch (err) {
//     res.status(400).send({ message: 'Переданы некорректные данные' });
//   }
// };

const deleteLike = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
      res.status(400).send({ message: 'Неверный id' });
      return;
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }

    res.send({ data: card });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Карточка не найдена' });
    } else if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else {
      console.error(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};
