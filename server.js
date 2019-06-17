const Express = require('express')
const app = Express()
const swaggerFile = require('./swagger')
const createMiddleware = require('./dist/index.js').default
const parseRequest = require('./dist/index.js').parseRequest

createMiddleware(swaggerFile, app, (error, swaggerMiddleware) => {
  app.use(
    swaggerMiddleware.metadata(),
    // swaggerMiddleware.parseRequest(),
    parseRequest(app),
    swaggerMiddleware.validateRequest(),
    (error, req, res, next) => {
      if (error) {
        console.log(error.message)
        return res.status(error.status).json({
          message: error.message
        })
      }

      next()
    }
  )
  app.get('/test', (req, res) => {
    res.json(req.swagger)
  })
  app.post('/test/:path', (req, res) => {
    res.json(req.swagger)
  })
  app.post('/test/:path/test2/:path2', (req, res) => {
    res.json(req.swagger)
  })
})

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000

// Listen the server
app.listen(port, host)
