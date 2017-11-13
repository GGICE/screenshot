const index = require('./views/index')
const apiCreate = require('./apis/create')

function routers(app, router) {
  app.use(router.routes())
  app.use(router.allowedMethods())
  router.get('/', index)
  router.post('/api/create', apiCreate)
}

module.exports = routers
