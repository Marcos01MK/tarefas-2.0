const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
  try {
    const novoProduto = await Produto.create({ nome: req.body.nome, preco: req.body.preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};

const listar = async (req, res) => {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
};

const buscar = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }
  const produtoEncontrado = await Produto.findOne({ _id: req.params.id });
  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    next();
  } else {
    res.status(404).json({ msg: 'Produto não encontrado' });
  }
};

const exibir = (req, res) => {
  res.status(200).json(req.produto);
};

const atualizar = async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      { nome: req.body.nome, preco: req.body.preco },
      { runValidators: true, new: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};

const remover = async (req, res) => {
  await Produto.findOneAndDelete({ _id: req.params.id });
  res.status(204).send();
};

module.exports = { criar, listar, buscar, exibir, atualizar, remover };