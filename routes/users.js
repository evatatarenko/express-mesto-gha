/* eslint-disable linebreak-style */
const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  changeUser,
  changeAvatar,
  getMyProfile,
} = require('../controllers/users');

const { validateId, validateProfile, validateAvatar } = require('../middlewares/validation');

usersRouter.route('/').get(getUsers);

usersRouter.get('/:userId', validateId, getUser);

usersRouter.post('/', createUser);

usersRouter.patch('/me', validateProfile, changeUser);
usersRouter.get('/me', getMyProfile);
usersRouter.patch('/me/avatar', validateAvatar, changeAvatar);

module.exports = usersRouter;
