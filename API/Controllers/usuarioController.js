let jwToken = require('jsonwebtoken')
let Usuario = require('../Models/usuarioModel')
const crypto = require('crypto')

exports.index = function (req, res) {
  Usuario.get(function (err, usuarios) {
    if (err) {
      res.status(500).json({
        mensagem: err
      })
    }
    return res.status(200).json({
      mensagem: 'Operação realizada com sucesso!',
      data: usuarios
    })
  })
}

exports.salvar = function (req, res) {
  const senha = req.body.senha
  const cipher = crypto.createCipher('aes128', 'a senha')
  var senhaCriptografada = cipher.update(senha, 'utf8', 'hex')
  senhaCriptografada += cipher.final('hex')

  var usuario = new Usuario()
  usuario.nome = req.body.nome
  usuario.email = req.body.email
  usuario.senha = senhaCriptografada
  usuario.telefones = req.body.telefones

  const email = usuario.email

  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    if (err) {
      res.status(500).json({
        mensagem: err
      })
    }

    if (usuario != null) {
      if (usuario.email != null) {
        return res.status(400).json({
          mensagem: 'E-mail já existente!'
        })
      }
    }
  })

  var token = jwToken.sign({ email }, process.env.SECRET, {
    expiresIn: 180
  })

  usuario.token = token

  usuario.save(function (err, usuario) {
    if (err) {
      return res.status(500).json({
        mensagem: err
      })
    }
    res.status(200).json({
      mensagem: 'Novo usuário criado!',
      data: usuario
    })
  })
}

exports.buscar = function (req, res) {
  var token = req.headers['token']

  if (!token) {
    return res.status(401).json({
      mensagem: 'Não autorizado!'
    })
  } else {
    Usuario.findById(req.params.id, function (err, usuario) {
      if (err) {
        return res.status(500).json({
          mensagem: err
        })
      }
      if (usuario != null) {
        if (token !== usuario.token) {
          return res.status(401).json({
            mensagem: 'Não autorizado!'
          })
        }
      } else {
        return res.status(400).json({
          mensagem: 'Usuário inexistente!'
        })
      }

      return res.status(200).json({
        message: 'Detalhes do Usuário',
        data: usuario
      })
    })
  }
}
