const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// Inicialize o app Express
const app = express();
app.use(bodyParser.json());

// Configurando o Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Importando o modelo User
const User = require('./models').User;

// Endpoint de exemplo para criar um usuário
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
