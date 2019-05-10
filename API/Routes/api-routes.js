let rotas = require('express').Router()

rotas.get('/', function (req, res) {
  res.json({
    status: 'API funcionando',
    message: 'Bem vindo ao Teste Tivia!'
  })
})

var usuarioController = require('../Controllers/usuarioController')
var autenticacaoController = require('../Controllers/authenticationController')

rotas.route('/usuarios')
  .get(usuarioController.index)
  .post(usuarioController.salvar)
rotas.route('/usuarios/:id')
  .get(usuarioController.buscar)

rotas.route('/login')
  .post(autenticacaoController.login)

module.exports = rotas
