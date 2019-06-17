import { createTestCases, positions } from './utils'

const cases = {
  intArray: {
    type: 'array',
    items: {
      type: 'integer'
    }
  },
  stringArray: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  numberArray: {
    type: 'array',
    items: {
      type: 'number'
    }
  },
  boolArray: {
    type: 'array',
    items: {
      type: 'boolean'
    }
  }
}

const testSuites = {
  intArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'integer array',
      value: [1, 2, 3],
      expectStatus: 200
    },
    {
      name: 'other than integer array',
      value: [1, 'a', true, null],
      expectStatus: 400
    }
  ],
  stringArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'string array',
      value: ['a', 'b', 'c'],
      expectStatus: 200
    }
  ],
  numberArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'number array',
      value: [1, 2.5, 3],
      expectStatus: 200
    },
    {
      name: 'other than number array',
      value: [1.5, 'a', true, null],
      expectStatus: 400
    }
  ],
  boolArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'boolean array',
      value: [true, false],
      expectStatus: 200
    },
    {
      name: 'other than number array',
      value: [1.5, 'a', true, null],
      expectStatus: 400
    }
  ]
}

describe('test array', () => {
  describe('intArray', () => {
    const testCaseName = 'intArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.QUERY,
      positions.HEADER,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('numberArray', () => {
    const testCaseName = 'numberArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.QUERY,
      positions.HEADER,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('boolArray', () => {
    const testCaseName = 'boolArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.QUERY,
      positions.HEADER,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
