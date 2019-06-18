import Ajv from 'ajv'
import ono from 'ono'
import * as _ from 'lodash'

const ajvOptions = {
  allErrors: true,
  verbose: true,
  coerceTypes: 'array',
  useDefaults: true,
  formats: {}
}
const ajv = new Ajv(ajvOptions)

const dataTypes = [
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'object',
  'file',
  'null'
]
const customProperties = {
  'x-type': 'type',
  'x-items': 'items',
  'x-exclusiveMaximum': 'exclusiveMaximum',
  'x-exclusiveMinimum': 'exclusiveMinimum',
  'x-additionalItems': 'additionalItems',
  'x-additionalProperties': 'additionalProperties',
  'x-contains': 'contains',
  'x-patternProperties': 'patternProperties',
  'x-dependencies': 'dependencies',
  'x-propertyNames': 'propertyNames',
  'x-const': 'const',
  'x-if': 'if',
  'x-then': 'then',
  'x-else': 'else',
  'x-anyOf': 'anyOf',
  'x-oneOf': 'oneOf',
  'x-not': 'not'
}
const modifiedProperties = {
  // if exclusiveMaximum is present
  // remove maximum property in both converted schema and schema
  exclusiveMaximum(schema) {
    if (typeof schema['exclusiveMaximum'] === 'boolean') {
      return schema['exclusiveMaximum']
        ? schema['maximum']
        : schema['maximum'] + 1
    }
    if (typeof schema['exclusiveMaximum'] === 'number') {
      return schema['exclusiveMaximum']
    }
    throw ono(
      { status: 500 },
      'exclusiveMaximum should be a boolean or a number'
    )
  },
  exclusiveMinimum(schema) {
    if (typeof schema['exclusiveMinimum'] === 'boolean') {
      return schema['exclusiveMinimum']
        ? schema['minimum']
        : schema['minimum'] - 1
    }
    if (typeof schema['exclusiveMinimum'] === 'number') {
      return schema['exclusiveMinimum']
    }
    throw ono(
      { status: 500 },
      'exclusiveMinimum should be a boolean or a number'
    )
  }
}
const ignoreProperties = []

export function jsonSchema(schema) {
  const convertedSchema = convertSchema(schema)
  validateSchema(convertedSchema)
  return {
    parse(value) {
      const parsedValue = parseRequestValue(convertedSchema, value)
      // if validation failed then throw error here
      jsonValidate(convertedSchema, parsedValue)
      return parsedValue
    }
  }
}

// validate using converted schema and return error if needed
function jsonValidate(schema, value) {
  if (ajv.validate(schema, value)) {
    return true
  } else {
    // return the first error of this schema
    throw ono(
      ajv.errors,
      { status: 400 },
      '"%s" %s',
      schema.name,
      ajv.errors[0].message
    )
  }
}

// convert schema
// convert from `x-` property to json schema property name
// convert modified property to json schema
// ignore unnecessary property
function convertSchema(schema) {
  schema = convertRequiredInPathSchema(schema)
  if (_.isArray(schema)) {
    return convertArraySchema(schema)
  }
  if (_.isObject(schema)) {
    return convertObjectSchema(schema)
  }
  return schema
}
// if schema is an array of schema object then convert
// else return value
function convertArraySchema(schema) {
  if (schema.every(element => !_.isObject(element))) {
    return schema
  }
  return schema.map(property => convertObjectSchema(property))
}
function convertObjectSchema(schema) {
  // remove attributes that also having `x-` version inside schema
  schema = Object.keys(schema).reduce((accumulator, schemaKey) => {
    if (
      Object.values(customProperties).includes(schemaKey) &&
      Object.keys(schema).includes(`x-${schemaKey}`)
    ) {
      return accumulator
    }
    return { ...accumulator, [schemaKey]: schema[schemaKey] }
  }, {})

  return Object.keys(schema).reduce((accumulator, current) => {
    // remove ignore properties
    if (ignoreProperties.includes(current)) {
      return accumulator
    }

    // convert modified properties
    if (Object.keys(modifiedProperties).includes(current)) {
      return {
        ...accumulator,
        [current]: modifiedProperties[current](schema)
      }
    }

    // recursively convert properties value
    schema[current] = convertSchema(schema[current])

    // change custom properties name to json schema name
    if (Object.keys(customProperties).includes(current)) {
      return {
        ...accumulator,
        [customProperties[current]]: schema[current]
      }
    }

    // if no modify needed, then keep current schema value
    return {
      ...accumulator,
      [current]: schema[current]
    }
  }, {})
}
// in path schema, required: true is required, but it conflict with json schema type (array)
// will convert required: true into require: [:paramName]
function convertRequiredInPathSchema(schema) {
  if (schema.in === 'path') {
    if (schema.required && schema.required === true) {
      schema.required = [schema.name]
    }
  }
  return schema
}
function validateSchema(schema) {
  // TODO: rewrite this
  if (!schema) {
    throw ono({ status: 500 }, 'Missing JSON schema')
  }
  if (schema.type !== undefined && dataTypes.indexOf(schema.type) === -1) {
    throw ono({ status: 500 }, 'Invalid JSON schema type: %s', schema.type)
  }
}

// get value to validate.
// if value type is not object or array
// and default is present
// and value is empty string ('') or null
// then return default value
// NOTE: ajv will automatically get default for object and array type
function getValueToValidate(schema, value) {
  if (
    value === undefined ||
    value === '' ||
    (schema.type === 'object' && _.isObject(value) && _.isEmpty(value))
  ) {
    if (schema.default !== undefined) {
      value = schema.default
    }
  }
  return value
}
function parseRequestValue(schema, value) {
  if (!schema) {
    return value
  }
  const parsedValue = getValueToValidate(schema, value)
  switch (schema.type) {
    case 'null':
      return parseNull(schema, parsedValue)
    case 'array':
      return parseArray(schema, parsedValue)
    default:
      return parsedValue
  }
}
function parseNull(schema, value) {
  if (_.isNull(value)) {
    return value
  }
  if (_.isString(value)) {
    if (value.toLowerCase() === 'null') {
      return null
    }
    // TODO: reconsider this: '' to be parsed as null
    if (value === '') {
      return null
    }
  }
  return value
}
function parseArray(schema, value) {
  if (_.isString(value) && value.length) {
    const arrayFormats = {
      csv: ',',
      tsv: '\t',
      ssv: ' ',
      pipes: '|'
    }
    const currentArrayFormat =
      schema.collectionFormat &&
      typeof arrayFormats[schema.collectionFormat] !== 'undefined'
        ? schema.collectionFormat
        : 'csv'
    value = value
      .split(arrayFormats[currentArrayFormat])
      .map(value => value.trim())
  }
  // TODO: reconsider this, transform '' to [] if type is array
  if (_.isString(value) && value === '') {
    value = []
  }

  return value
}
