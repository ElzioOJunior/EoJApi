
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let helmet = require('helmet')

let app = express()

require('dotenv-safe').load()

let apiRoutes = require('./API/Routes/api-routes')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

mongoose.connect('mongodb+srv://teste:abcd.123H@cluster0-5s48k.mongodb.net/test?retryWrites=true')

var port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Api em funcionamento!'))

app.use('/api', apiRoutes)

app.listen(port, function () {
  console.log('Aplicação TesteTivia rodando na porta ' + port)
})
