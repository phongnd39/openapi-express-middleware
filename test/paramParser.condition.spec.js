import { createTestCases, positions } from './utils'

const cases = {
  condition: {
    type: 'string',
    'x-if': {
      pattern: '^[A-Z_]*$'
    },
    'x-then': {
      minLength: 3
    },
    'x-else': {
      minLength: 1
    }
  },
  conditionArray: {
    type: 'array',
    items: {}, // this is required
    'x-if': {
      minItems: 2
    },
    'x-then': {
      items: {
        type: 'boolean'
      }
    },
    'x-else': {
      items: {
        type: 'integer'
      }
    }
  },
  conditionObject: {
    type: 'object',
    properties: {
      test1: { type: 'string' },
      test2: { enum: ['enum1', 'enum2'] }
    },
    required: ['test2'],
    'x-if': {
      properties: { test2: { const: 'enum1' } }
    },
    'x-then': {
      properties: { test3: { type: 'boolean' } },
      required: ['test3']
    },
    'x-else': {
      properties: { test4: { type: 'integer' } },
      required: ['test4']
    }
  }
}

const testSuites = {
  condition: [
    {
      name: 'not related to condition',
      value: 'test',
      expectStatus: 200
    },
    {
      name: 'correct condition',
      value: 'TEST',
      expectStatus: 200
    },
    {
      name: 'incorrect condition',
      value: 'T',
      expectStatus: 400
    }
  ],
  conditionArray: [
    {
      name: 'not related to condition',
      value: [1],
      expectStatus: 200
    },
    {
      name: 'correct condition',
      value: [true, false, true],
      expectStatus: 200
    },
    {
      name: 'incorrect condition',
      value: [true, false, 'string'],
      expectStatus: 400
    },
    {
      name: 'incorrect else condition',
      value: ['string', 'string'],
      expectStatus: 400
    }
  ],
  conditionObject: [
    {
      name: 'match if statement',
      value: {
        test2: 'enum1',
        test3: true
      },
      expectStatus: 200
    },
    {
      name: 'match if statement but then fail',
      value: {
        test2: 'enum1',
        test3: 'string'
      },
      expectStatus: 400
    },
    {
      name: 'match else statement',
      value: {
        test2: 'enum2',
        test4: 1
      },
      expectStatus: 200
    },
    {
      name: 'match else statement but fail',
      value: {
        test2: 'enum2',
        test4: 'string'
      },
      expectStatus: 400
    }
  ]
}

// cannot pass type null for request other than body in swagger 2
describe('test condition', () => {
  describe('condition', () => {
    const testCaseName = 'condition'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.FORMDATA,
      positions.HEADER,
      positions.QUERY
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('conditionArray', () => {
    const testCaseName = 'conditionArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.FORMDATA,
      positions.HEADER,
      positions.QUERY
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('conditionObject', () => {
    const testCaseName = 'conditionObject'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
