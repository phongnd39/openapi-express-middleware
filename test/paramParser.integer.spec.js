import { createTestCases, positions } from './utils'

const cases = {
  range: {
    type: 'integer',
    minimum: 1,
    maximum: 10
  },
  exclusiveRange: {
    type: 'integer',
    minimum: 1,
    maximum: 10,
    exclusiveMinimum: true,
    exclusiveMaximum: true
  },
  xRange: {
    type: 'integer',
    'x-exclusiveMinimum': 1,
    'x-exclusiveMaximum': 10
  },
  multipleOf: {
    type: 'integer',
    multipleOf: 5
  }
}

const testSuites = {
  range: [
    {
      name: 'greater than maximum',
      value: cases['range'].maximum + 1,
      expectStatus: 400
    },
    {
      name: 'smaller than minimum',
      value: cases['range'].minimum - 1,
      expectStatus: 400
    },
    {
      name: 'equal maximum',
      value: cases['range'].maximum,
      expectStatus: 200
    },
    {
      name: 'equal minimum',
      value: cases['range'].minimum,
      expectStatus: 200
    },
    {
      name: 'between maximum and minimum',
      value: Math.floor((cases['range'].maximum + cases['range'].minimum) / 2),
      expectStatus: 200
    }
  ],
  exclusiveRange: [
    {
      name: 'equal exclusive maximum',
      value: cases['exclusiveRange'].maximum,
      expectStatus: 400
    },
    {
      name: 'equal exclusive minimum',
      value: cases['exclusiveRange'].minimum,
      expectStatus: 400
    },
    {
      name: 'between maximum and minimum',
      value: Math.floor(
        (cases['exclusiveRange'].maximum + cases['exclusiveRange'].minimum) / 2
      ),
      expectStatus: 200
    }
  ],
  xRange: [
    {
      name: 'equal x-exclusiveMinimum',
      value: cases['xRange']['x-exclusiveMinimum'],
      expectStatus: 400
    },
    {
      name: 'equal x-exclusiveMaximum',
      value: cases['xRange']['x-exclusiveMaximum'],
      expectStatus: 400
    },
    {
      name: 'between maximum and minimum',
      value: Math.floor(
        cases['xRange']['x-exclusiveMinimum'] +
          cases['xRange']['x-exclusiveMaximum'] / 2
      ),
      expectStatus: 200
    }
  ],
  multipleOf: [
    {
      name: 'not a multiple of defined value',
      value: cases['multipleOf'].multipleOf + 1,
      expectStatus: 400
    },
    {
      name: 'multiple of defined value',
      value: cases['multipleOf'].multipleOf * 2,
      expectStatus: 200
    }
  ]
}

describe('test integer', () => {
  describe('range', () => {
    const testCaseName = 'range'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.HEADER,
      positions.QUERY,
      positions.BODY,
      positions.FORMDATA
    ]
    // TODO: parse path
    describe('path', () => {})

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })

  describe('exclusiveRange', () => {
    const testCaseName = 'exclusiveRange'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.HEADER,
      positions.QUERY,
      positions.BODY,
      positions.FORMDATA
    ]
    // TODO: parse path
    describe('path', () => {})

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })

  describe('xRange', () => {
    const testCaseName = 'xRange'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.HEADER,
      positions.QUERY,
      positions.BODY,
      positions.FORMDATA
    ]
    // TODO: parse path
    describe('path', () => {})

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })

  describe('multipleOf', () => {
    const testCaseName = 'multipleOf'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.HEADER,
      positions.QUERY,
      positions.BODY,
      positions.FORMDATA
    ]
    // TODO: parse path
    describe('path', () => {})

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
