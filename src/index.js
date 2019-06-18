import createMiddleware, {
  DataStore,
  FileDataStore,
  MemoryDataStore,
  Resource
} from 'swagger-express-middleware'
import { requestParser, paramParser } from './parsers'

function parseRequest(app, options = {}) {
  return [...requestParser(options), ...paramParser()]
}

function expressOpenApiMiddleware(swagger, router, options = {}) {
  const defaultOptions = {
    enableBodyParser: false,
    enableValidateRequest: false
  }
  const mergedOptions = { ...defaultOptions, ...options }
  const swaggerExpressMiddleware = createMiddleware(swagger, router)
  let middleware = []
  if (mergedOptions.enableBodyParser || mergedOptions.enableValidateRequest) {
    middleware = [...middleware, ...swaggerExpressMiddleware.metadata()]
  }
  if (mergedOptions.enableBodyParser) {
    middleware = [...middleware, ...parseRequest(router)]
  }
  if (mergedOptions.enableValidateRequest) {
    middleware = [...middleware, ...swaggerExpressMiddleware.validateRequest()]
  }
  return middleware
}

export {
  expressOpenApiMiddleware,
  DataStore,
  FileDataStore,
  MemoryDataStore,
  Resource
}
