require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`);

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;