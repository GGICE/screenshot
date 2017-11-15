const router = require('koa-router')()
const Koa = require('koa')

const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const logger = require('koa-logger')
const serve = require('koa-static')
const config = require('./config/config')
const path = require('path')

// logger
app.use(logger())
// cors
app.use(cors())
// Parser body
app.use(bodyParser())
// Static server
app.use(serve(path.join(__dirname, '../src/static')))
app.use(serve(path.join(__dirname, '../public')))
app.use(serve(path.join(__dirname, '../created-images')))

// routes
require('./routes')(app, router)

if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`listening to http://localhost:${config.port}`)
  })
}

module.exports = app
