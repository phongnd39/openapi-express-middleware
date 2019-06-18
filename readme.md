## Express OpenApi Middleware [WIP]

A (group of) middleware that consumes Swagger (OpenApi version 2) or OpenApi version 3 and provides validation for request parameters and response object based on the consumed Swagger - OpenApi file

## Features

- [TODO] Swagger 2.0 (and OpenApi 3) support
- [TODO] Add custom keywords for Swagger 2 to provide additional functions, make swagger 2.0 have same functionality with OpenApi 3 (via vendor-extension `x-`)
- [TODO] Convert Swagger request parameters and responses to Json Schema draft 7 or later
- [TODO] Create documentation UI for Swagger document

## Installation

```bash
yarn add openapi-express-middleware
```

or

```bash
npm install --save openapi-express-middleware
```

## Usage

import via ES6 syntax

```js
import Express from 'express'
import expressOpenApiMiddleware from 'openapi-express-middleware'
import swaggerFile from './swaggerFile'
const app = Express()

app.use(
  expressOpenApiMiddleware(swaggerFile, app, {
    enableBodyParser: true,
    enableValidateRequest: true
  })
)
```

or CommonJs

```js
const Express = require('express')
const expressOpenApiMiddleware = require('openapi-express-middleware').default
const swaggerFile = require('./swaggerFile')
const app = Express()

app.use(
  expressOpenApiMiddleware(swaggerFile, app, {
    enableBodyParser: true,
    enableValidateRequest: true
  })
)
```

## Options

#### enableBodyParser (true | false)

Enable bodyparser middleware or not. Bodyparser middleware will base on the consumes settings in OpenApi setting file to act accordingly

Default: false

#### enableValidateRequest (true | false)

Enable validateRequestMiddleware or not. This middleware will validate the type of request parameter and request path.

Default: false

#### parserOptions

Options to be passed to bodyParser middleware. Options can be found [here](https://github.com/expressjs/body-parser)

Default: {}

## Used library

- bodyParser
- swagger-express-middleware
- ajv
