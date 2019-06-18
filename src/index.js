import * as _object from 'lodash/object'
import createMiddleware from 'swagger-express-middleware'
import { paramParser, requestParser } from './parsers'

export default function expressOpenApiMiddleware(
  swagger,
  router,
  options = {}
) {
  const defaultOptions = {
    enableBodyParser: false,
    enableValidateRequest: false,
    parserOptions: {}
  }
  const mergedOptions = _object.merge({}, defaultOptions, options)
  const swaggerExpressMiddleware = createMiddleware(swagger, router)
  let middleware = []
  if (mergedOptions.enableBodyParser || mergedOptions.enableValidateRequest) {
    middleware = [...middleware, ...swaggerExpressMiddleware.metadata()]
  }
  if (mergedOptions.enableBodyParser) {
    middleware = [...middleware, requestParser(mergedOptions.parserOptions)]
  }
  if (mergedOptions.enableValidateRequest) {
    middleware = [
      ...middleware,
      ...paramParser(),
      ...swaggerExpressMiddleware.validateRequest()
    ]
  }
  return middleware
}
