/* eslint-disable linebreak-style */
require('dotenv').config();

const {
  PORT = 3001,
  URI = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
mongoose.connection.on('error', () => {
  console.log('problem');
});

mongoose.connection.on('connected', () => {
  console.log('success');
});

mongoose.connect(URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64cd11dac554369263de0a82', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/:404', (req, res, next) => {
  res.status(404).send({ message: 'страница не найдена' });
  next();
});

app.listen(PORT, () => {
  console.log(`сервер запущен на порте: ${PORT}`);
});
