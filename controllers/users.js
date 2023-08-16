/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { JWT_SECRET = 'hghghghghghghghg' } = process.env;
const NotFound = require('../Errors/notFound');

console.log(JWT_SECRET);

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
    })
    .catch((error) => {
      next(error);
    });
};

const getUsers = (req, res, next) => {
  console.log(next);
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      res.status(201).send({ data: userWithoutPassword });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('token', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

const changeUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      const error = new NotFound('Пользователь по указанному _id не найден');
      return next(error);
    })
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      const error = new NotFound('Пользователь по указанному _id не найден');
      return next(error);
    })
    .catch(next);
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  changeAvatar,
  changeUser,
  login,
  getMyProfile,
};
