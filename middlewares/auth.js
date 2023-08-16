const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'hghghghghghghghg' } = process.env;
const Unauthorized = require('../Errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходимо пройти авторизацию'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Необходимо пройти авторизацию'));
  }

  req.user = payload;

  return next();
};
