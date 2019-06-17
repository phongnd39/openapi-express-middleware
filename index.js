// import { parseRequest } from './middleware/parseRequest'
// export { parseRequest }

import { requestParser, paramParser } from './middleware/parsers'

export function parseRequest(app, options = {}) {
  return [...requestParser(options), ...paramParser(app)]
}
