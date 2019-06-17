import { createTestCases, positions } from './utils'

const cases = {
  true: {
    type: 'boolean'
  },
  false: {
    type: 'boolean'
  }
}

const testSuites = {
  true: [
    {
      name: 'boolean true',
      value: true,
      expectStatus: 200
    },
    {
      name: 'other true value',
      value: 1,
      expectStatus: 400
    }
  ],
  false: [
    {
      name: 'boolean false',
      value: false,
      expectStatus: 200
    },
    {
      name: 'other false value',
      value: 0,
      expectStatus: 400
    }
  ]
}

describe('test boolean', () => {
  describe('true', () => {
    const testCaseName = 'true'
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
  describe('false', () => {
    const testCaseName = 'false'
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
