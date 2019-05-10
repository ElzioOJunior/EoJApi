let jwToken = require('jsonwebtoken')
let Usuario = require('../Models/usuarioModel')

exports.login = function (req, res) {
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    if (err) {
      return res.status(500).json({
        mensagem: err
      })
    }

    if (req.body.email === usuario.email && req.body.senha === usuario.senha) {
      const email = usuario.email
      var token = jwToken.sign({ email }, process.env.SECRET, {
        expiresIn: 180
      })

      usuario.dataUltimoLogin = Date.now
      usuario.token = token

      usuario.save(function (err) {
        if (err) {
          return res.status(500).json({
            mensagem: err
          })
        }
      })
      res.status(200).json({
        mensagem: 'Usuário Logado com Sucesso!',
        data: usuario
      })
    } else {
      res.status(401).json({
        mensagem: 'Usuário e/ou Senha inválidos!'
      })
    }
  })
}
