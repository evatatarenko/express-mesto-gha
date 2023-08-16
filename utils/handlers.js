const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;

const Unauthorized = require('../Errors/unauthorized');
const NotFound = require('../Errors/notFound');
const Forbidden = require('../Errors/forbidden');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(400)
      .send({ message: `Переданы некорректные данные ${400}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(404)
      .send({
        message: `Пользователь не найден ${404}`,
      });
  }

  if (err instanceof NotFound || err instanceof Unauthorized || err instanceof Forbidden) {
    const { message } = err;
    return res
      .status(err.type)
      .send({ message });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .send({ message: 'Почта уже зарегистрирована' });
  }

  res
    .status(500)
    .send({
      message: 'На сервере произошла ошибкас',
    });

  return next();
};
