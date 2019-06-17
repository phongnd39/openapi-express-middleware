import { requestParser, paramParser } from './parsers'

export function parseRequest(app, options = {}) {
  return [...requestParser(options), ...paramParser(app)]
}
