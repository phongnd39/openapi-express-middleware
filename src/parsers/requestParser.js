import * as _object from 'lodash/object'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import tmp from 'tmp'

// Clean up the temp directory
tmp.setGracefulCleanup()

export function requestParser(options = {}) {
  const defaultOptions = {
    cookie: {
      secret: undefined
    },
    json: {
      limit: '1mb',
      type: ['json', '*/json', '+json']
    },
    text: {
      limit: '1mb',
      type: ['text/*']
    },
    urlencoded: {
      extended: true,
      limit: '1mb'
    },
    raw: {
      limit: '5mb',
      type: 'application/*'
    },
    multipart: {
      dest: tmp.dirSync({ prefix: 'swagger-middleware-', unsafeCleanup: true })
        .name,
      putSingleFilesInArray: false
    }
  }
  options = _object.merge({}, defaultOptions, options)
  return [
    cookieParser(options.cookie.secret, options.cookie),
    bodyParser.json(options.json),
    bodyParser.text(options.text),
    bodyParser.urlencoded(options.urlencoded),
    bodyParser.raw(options.raw)
    // multer(options.multipart) // TODO: should not make multer global middleware. should check swagger and auto enable it there
  ]
}
