import createMiddleware from 'swagger-express-middleware'
import { requestParser, paramParser } from './parsers'

export default createMiddleware
export function parseRequest(app, options = {}) {
  return [...requestParser(options), ...paramParser(app)]
}
