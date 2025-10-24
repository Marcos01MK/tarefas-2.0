require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`);

const app = express();

app.use(express.json());

const produtosRouter = require('./routes/produtosRouter');
app.use(produtosRouter);

module.exports = app;