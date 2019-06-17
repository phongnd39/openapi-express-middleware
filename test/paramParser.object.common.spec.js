import { createTestCases, positions } from './utils'

const cases = {
  object: {
    type: 'object',
    properties: {
      integer: { type: 'integer' },
      number: { type: 'number' },
      string: { type: 'string' },
      boolean: { type: 'boolean' },
      null: { type: 'null' },
      object: { type: 'object' },
      array: { type: 'array' }
    }
  }
}

const testSuites = {
  object: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'integer property',
      value: {
        integer: 1
      },
      expectStatus: 200
    },
    {
      name: 'incorrect integer property',
      value: {
        integer: 'string'
      },
      expectStatus: 400
    },
    {
      name: 'number property',
      value: {
        number: 1.5
      },
      expectStatus: 200
    },
    {
      name: 'incorrect number property',
      value: {
        number: 'string'
      },
      expectStatus: 400
    },
    {
      name: 'string property',
      value: {
        string: 'string'
      },
      expectStatus: 200
    },
    {
      name: 'incorrect string property',
      value: {
        string: []
      },
      expectStatus: 400
    },
    {
      name: 'boolean property',
      value: {
        boolean: true
      },
      expectStatus: 200
    },
    {
      name: 'incorrect boolean property',
      value: {
        boolean: "string"
      },
      expectStatus: 400
    },
    {
      name: 'null property',
      value: {
        null: null
      },
      expectStatus: 200
    },
    {
      name: 'incorrect null property',
      value: {
        null: 1
      },
      expectStatus: 400
    },
    {
      name: 'object property',
      value: {
        object: {
          object: true
        }
      },
      expectStatus: 200
    },
    {
      name: 'incorrect object property',
      value: {
        object: false
      },
      expectStatus: 400
    },
    {
      name: 'array property',
      value: {
        array: [1, 2, 3]
      },
      expectStatus: 200
    }
  ]
}

describe('test object', () => {
  describe('object', () => {
    const testCaseName = 'object'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
