import * as _object from 'lodash/object'
import typeis from 'type-is'
import bodyParser from 'body-parser'
import multer from 'multer'
import tmp from 'tmp'

// Clean up the temp directory
tmp.setGracefulCleanup()

export function requestParser(options = {}) {
  // defined default options here
  const defaultOptions = {
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
      dest: tmp.dirSync({
        prefix: 'express-openapi-middleware-',
        unsafeCleanup: true
      }).name,
      putSingleFilesInArray: false
    }
  }
  options = _object.merge({}, defaultOptions, options)
  return (req, res, next) => {
    // if swagger or swagger.api.consumes not found or not an array then to the next middleware
    if (
      !req.swagger ||
      !req.swagger.api ||
      !Array.isArray(req.swagger.api.consumes)
    ) {
      return next()
    }
    // check type of req
    const requestContentType = typeis(req, req.swagger.api.consumes)
    if (!requestContentType) {
      return next()
    }
    // check type of return consume type
    if (typeis.is(requestContentType, ['json', '*/json', '+json'])) {
      // json
      return bodyParser.json(options.json)(req, res, () => next())
    }
    if (typeis.is(requestContentType, ['text', 'text/*'])) {
      // text
      return bodyParser.text(options.text)(req, res, () => next())
    }
    if (typeis.is(requestContentType, ['urlencoded'])) {
      // form urlencode
      return bodyParser.urlencoded(options.urlencoded)(req, res, () => next())
    }
    if (typeis.is(requestContentType, ['application/*'])) {
      // raw
      return bodyParser.raw(options.raw)(req, res, () => next())
    }
    if (typeis.is(requestContentType, ['multipart'])) {
      // file upload
      // TODO: read swagger file, extract file input fields and call multer here
      // multer(options.multipart)
      return next()
    }
    return next()
  }
}
