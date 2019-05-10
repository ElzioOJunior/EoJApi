var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: String,
  token: {
    type: String
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now
  },
  dataUltimoLogin: {
    type: Date,
    default: Date.now
  },
  telefones: [
    {
      numero: String,
      ddd: String
    }
  ]
})

var Usuario = module.exports = mongoose.model('usuario', userSchema)
module.exports.get = function (callback, limit) {
  Usuario.find(callback).limit(limit)
}
