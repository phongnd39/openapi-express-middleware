import express from 'express'
import request from 'supertest'
import * as _ from 'lodash'
import createMiddleware from 'swagger-express-middleware'
import SwaggerParser from 'swagger-parser'
import { parseRequest } from '../..'
import template from './template'

const defaultResponses = {
  '200': {
    description: 'success',
    schema: {
      $ref: '#/definitions/Success'
    }
  },
  '400': {
    description: 'bad request',
    schema: {
      $ref: '#/definitions/Error400'
    }
  },
  '500': {
    description: 'server error',
    schema: {
      $ref: '#/definitions/Error500'
    }
  }
}
export const positions = {
  HEADER: 'header',
  QUERY: 'query',
  BODY: 'body',
  FORMDATA: 'formData',
  PATH: 'path'
}

function createSwaggerSettings(testCaseName, testCase, position) {
  return {
    ...template,
    paths: {
      ...template.paths,
      ...createPath(testCaseName, testCase, position)
    }
  }
}

function createPath(testCaseName, testCase, position) {
  return {
    [createPathUrl(position)]: {
      post: {
        operationId: `test`,
        parameters: [createParams(testCaseName, testCase, position)],
        responses: defaultResponses
      }
    }
  }
}

function createParams(testCaseName, testCase, position) {
  if (position === positions.BODY) {
    return {
      name: testCaseName,
      in: position,
      schema: {
        ...testCase
      }
    }
  }
  if (position === positions.PATH) {
    return {
      name: testCaseName,
      in: position,
      required: true,
      ...testCase
    }
  }
  return {
    name: testCaseName,
    in: position,
    ...testCase
  }
}

function createPathUrl(position) {
  if (position === positions.PATH) {
    return '/test/{path}'
  }
  return '/test'
}

function createExpressInstance(swaggerFile, position) {
  const app = express()

  createMiddleware(swaggerFile, app, (error, swaggerMiddleware) => {
    app.use(
      swaggerMiddleware.metadata(),
      parseRequest(app),
      swaggerMiddleware.validateRequest(),
      (error, req, res, next) => {
        if (error) {
          // console.log(error)
          return res.status(error.status).json({
            message: error.message
          })
        }
        next()
      }
    )
    app.use(express.static('static'))

    // put generated routes here
    app.post(createExpressPathUrl(position), (req, res) => {
      res.send('Success')
    })
  })

  return app
}

function createExpressPathUrl(position) {
  if (position === positions.PATH) {
    return '/test/:path'
  }
  return '/test'
}

async function validateSwagger(swagger) {
  return await SwaggerParser.validate(swagger, {
    validate: {
      spec: true
    }
  })
}

export async function createApp(testCaseName, testCase, position) {
  const swagger = createSwaggerSettings(testCaseName, testCase, position)
  console.log('original schema', JSON.stringify(swagger))
  await validateSwagger(swagger)
  const app = createExpressInstance(swagger, position)
  return await request(app)
}

export async function createRequest(server, position, value, key) {
  switch (position) {
    case positions.HEADER:
      return await server
        .post('/test')
        .set({ [key]: value })
        .use(parseParamValue)
    case positions.QUERY:
      return await server
        .post('/test')
        .query({ [key]: value })
        .use(parseParamValue)
    case positions.BODY:
      if (_.isArray(value) || _.isObject(value)) {
        return await server.post('/test').send(value)
      }
      if (_.isNull(value)) {
        return await server
          .post('/test')
          .set({ 'Content-Type': 'text/plain' })
          .send('')
      }
      return await server
        .post('/test')
        .set({ 'Content-Type': 'text/plain' })
        .send(value.toString())
    case positions.PATH:
      return await server.post(`/test/${value}`)
    case positions.FORMDATA:
      return await server
        .post('/test')
        .type('form')
        .send({ [key]: value })
        .use(parseParamValue)
  }
}

// patching for supertest request, as supertest left out empty array, empty string and null value
function parseParamValue(request) {
  const header = handleHeaderValue(request.header)
  const qs = handleQueryValue(request.qs)
  const _data = handleFormDataValue(request._data)
  if (header) request.header = header
  if (qs) request.qs = qs
  if (_data) request._data = _data
  return request
}
function handleHeaderValue(values) {
  if (!values) return false
  return Object.keys(values)
    .map(key => {
      if (_.isArray(values[key]) && _.isEmpty(values[key])) {
        return { [key]: '' }
      }
      return { [key]: values[key] }
    })
    .reduce((accumulation, current) => {
      return { ...accumulation, ...current }
    }, {})
}
function handleQueryValue(values) {
  if (_.isUndefined(values)) return false
  if (_.isObject(values)) {
    return Object.keys(values)
      .map(key => {
        if (_.isArray(values[key])) {
          if (_.isEmpty(values[key])) {
            return { [key]: '' }
          }
          return {
            [key]: values[key].map(value => {
              if (_.isNull(value)) {
                return 'null'
              }
              return value
            })
          }
        }
        return { [key]: values[key] }
      })
      .reduce((accumulation, current) => {
        return { ...accumulation, ...current }
      }, {})
  }
  return values
}
function handleFormDataValue(values) {
  if (_.isUndefined(values)) return false
  if (_.isObject(values)) {
    return Object.keys(values)
      .map(key => {
        if (_.isArray(values[key])) {
          if (_.isEmpty(values[key])) {
            return { [key]: '' }
          }
          return {
            [key]: values[key].map(value => {
              if (_.isNull(value)) {
                return 'null'
              }
              return value
            })
          }
        }
        return { [key]: values[key] }
      })
      .reduce((accumulation, current) => {
        return { ...accumulation, ...current }
      }, {})
  }
  return values
}

export function createTestCases(
  testCaseName,
  testCase,
  testPositions,
  testSuite
) {
  for (let testPosition of testPositions) {
    describe(testPosition, () => {
      for (let suite of testSuite) {
        it(suite.name, async () => {
          const server = await createApp(testCaseName, testCase, testPosition)
          const response = await createRequest(
            server,
            testPosition,
            suite.value,
            testCaseName
          )
          expect(response.status).toEqual(suite.expectStatus)
        })
      }
    })
  }
}
