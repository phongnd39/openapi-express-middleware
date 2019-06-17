import { createTestCases, positions } from './utils'

const testProperties = {
  integer: { type: 'integer' },
  number: { type: 'number' },
  string: { type: 'string' },
  boolean: { type: 'boolean' },
  null: { type: 'null' },
  object: { type: 'object' },
  array: { type: 'array' }
}
const cases = {
  complex: {
    type: 'object',
    properties: {
      nestedObject: {
        type: 'object',
        properties: {
          nestedObject: {
            type: 'object',
            properties: testProperties
          }
        }
      },
      arrayTuple: {
        type: 'array',
        items: {
          type: 'array',
          items: [{ type: 'integer' }, { type: 'string' }],
          'x-additionalItems': false
        }
      }
    }
  }
}

const testSuites = {
  complex: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'nested object',
      value: {
        nestedObject: {
          nestedObject: {
            integer: 1,
            string: 'string'
          }
        }
      },
      expectStatus: 200
    },
    {
      name: 'incorrect nested object',
      value: {
        nestedObject: {
          nestedObject: {
            integer: 1,
            string: 'string',
            boolean: 'string'
          }
        }
      },
      expectStatus: 400
    },
    {
      name: 'array tuple',
      value: {
        arrayTuple: [[1, '2'], [3, 'a']]
      },
      expectStatus: 200
    },
    {
      name: 'incorrect array tuple',
      value: {
        arrayTuple: [[1, '2'], [3, 'a', 4]]
      },
      expectStatus: 400
    }
  ]
}

describe('test complex object', () => {
  describe('complex', () => {
    const testCaseName = 'complex'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
