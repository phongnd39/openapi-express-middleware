import * as _ from 'lodash'
import ono from 'ono'
import { jsonSchema } from '../utils/jsonSchema'

export function paramParser() {
  return [
    parsePathParam,
    parseSimpleParams,
    parseFormDataParams,
    parseBodyParam
  ]
}

function parseSimpleParams(req, res, next) {
  let params = getParams(req)

  if (params.length > 0) {
    params.forEach(param => {
      switch (param.in) {
        case 'query':
          req.query[param.name] = parseParameter(
            param,
            req.query[param.name],
            param
          )
          break
        case 'header':
          req.headers[param.name.toLowerCase()] = parseParameter(
            param,
            req.header(param.name),
            param
          )
          break
      }
    })
  }

  next()
}

function parseFormDataParams(req, res, next) {
  getParams(req).forEach(param => {
    if (param.in === 'formData') {
      if (param.type === 'file') {
        req.files[param.name] = parseParameter(
          param,
          req.files[param.name],
          param
        )
      } else {
        req.body[param.name] = parseParameter(
          param,
          req.body[param.name],
          param
        )
      }
    }
  })

  next()
}

function parseBodyParam(req, res, next) {
  let params = getParams(req)

  params.some(param => {
    if (param.in === 'body') {
      if (_.isPlainObject(req.body) && _.isEmpty(req.body)) {
        if (
          param.type === 'string' ||
          (param.schema && param.schema.type === 'string')
        ) {
          req.body = ''
        } else {
          req.body = {}
        }
      }

      // Parse the body
      req.body = parseParameter(param, req.body, param.schema)

      // There can only be one "body" parameter, so skip the rest
      return true
    }
  })

  // If there are no body/formData parameters, then reset `req.body` to undefined
  if (params.length > 0) {
    let hasBody = params.some(param => {
      return param.in === 'body' || param.in === 'formData'
    })

    if (!hasBody) {
      req.body = undefined
    }
  }

  next()
}

function parsePathParam(req, res, next) {
  if (!req.swagger) {
    return next()
  }

  const swaggerParamRegExp = /{([^/}]+)}/g
  req.pathParams = {}

  if (req.swagger.pathName.indexOf('{') >= 0) {
    // Convert the Swagger path to a RegExp
    let paramNames = []
    const pathPattern = req.swagger.pathName.replace(
      swaggerParamRegExp,
      (match, paramName) => {
        paramNames.push(paramName)
        return '([^/]+)'
      }
    )

    // Exec the RegExp to get the path param values from the URL
    const values = new RegExp(pathPattern + '/?$', 'i').exec(req.path)

    for (let i = 1; i < values.length; i++) {
      const paramName = paramNames[i - 1]
      const paramValue = decodeURIComponent(values[i])
      const schema = _.find(req.swagger.params, { in: 'path', name: paramName })
      req.pathParams[paramName] = parseParameter(paramName, paramValue, schema)
      req.params[paramName] = parseParameter(paramName, paramValue, schema)
    }
  }
  next()
}

export function parseParameter(param, value, schema) {
  if (value === undefined) {
    if (param.required) {
      let errCode = 400

      if (
        param.in === 'header' &&
        param.name.toLowerCase() === 'content-length'
      ) {
        // Special case for the Content-Length header.  It has it's own HTTP error code.
        errCode = 411 // (Length Required)
      }

      // noinspection ExceptionCaughtLocallyJS
      throw ono(
        { status: errCode },
        'Missing required %s parameter "%s"',
        param.in,
        param.name
      )
    } else if (schema.default === undefined) {
      // The parameter is optional, and there's no default value
      return undefined
    }
  }

  // Special case for the Content-Length header.  It has it's own HTTP error code (411 Length Required)
  if (
    value === '' &&
    param.in === 'header' &&
    param.name.toLowerCase() === 'content-length'
  ) {
    throw ono(
      { status: 411 },
      'Missing required header parameter "%s"',
      param.name
    )
  }

  return jsonSchema(schema).parse(value)
}

function getParams(req) {
  if (req.swagger && req.swagger.params) {
    return req.swagger.params
  }
  return []
}
