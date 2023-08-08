/* eslint-disable linebreak-style */
const User = require('../models/user');

const getUser = (req, res) => {
  const id = req.params.userId;
  try {
    if (id) {
      User.findById({ _id: id })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else {
            res.status(500).send({ message: 'На сервере произошла ошибка' });
          }
        });
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const changeUser = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь не найден' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь не найден' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  changeAvatar,
  changeUser,
};
