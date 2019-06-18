const Express = require('express')
const app = Express()
const swaggerFile = require('./swagger')
const expressOpenApiMiddleware = require('./dist/index.js').default

app.use(
  expressOpenApiMiddleware(swaggerFile, app, {
    enableBodyParser: true,
    enableValidateRequest: true
  }),
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

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000

// Listen the server
app.listen(port, host)
