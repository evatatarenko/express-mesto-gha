/* eslint-disable linebreak-style */
const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.route('/').get(getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.post('/', createUser);

usersRouter.patch('/me', changeUser);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;
