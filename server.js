// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const pause = require('connect-pause')

server.use(middlewares)
server.use(pause(500))
server.use(router)

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    error_code: 0,
    error_msg: ''
  })
}

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000!')
})
