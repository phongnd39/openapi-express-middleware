import { createTestCases, positions } from './utils'

const cases = {
  common: {
    type: 'string'
  },
  length: {
    type: 'string',
    minLength: 1,
    maxLength: 5
  },
  regex: {
    type: 'string',
    pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$'
  },
  formatDateTime: {
    type: 'string',
    format: 'date-time'
  },
  formatDate: {
    type: 'string',
    format: 'date'
  },
  formatTime: {
    type: 'string',
    format: 'time'
  }
}

const testSuites = {
  common: [
    {
      name: 'string value',
      value: 'test string',
      expectStatus: 200
    }
  ],
  length: [
    {
      name: 'string length smaller than minLength',
      value: '',
      expectStatus: 400
    },
    {
      name: 'string length equal minLength',
      value: 'a',
      expectStatus: 200
    },
    {
      name: 'string length greater than maxLength',
      value: 'abcdef',
      expectStatus: 400
    },
    {
      name: 'string length equal maxLength',
      value: 'abcde',
      expectStatus: 200
    },
    {
      name: 'string length between minLength and maxLength',
      value: '1234',
      expectStatus: 200
    }
  ],
  regex: [
    {
      name: 'passed regex value',
      value: '(888)555-1212',
      expectStatus: 200
    },
    {
      name: 'not passed regex value',
      value: '(800)FLOWERS',
      expectStatus: 400
    }
  ],
  formatDateTime: [
    {
      name: 'ISO8601 date-time',
      value: new Date().toISOString(),
      expectStatus: 200
    },
    {
      name: 'other than ISO8601 date-time',
      value: new Date().toUTCString(),
      expectStatus: 400
    }
  ],
  formatDate: [
    {
      name: 'ISO8601 date',
      value: new Date().toISOString().split('T')[0],
      expectStatus: 200
    },
    {
      name: 'other than ISO8601 date',
      value: `${new Date().getDate()}/${new Date().getMonth() +
        1}/${new Date().getFullYear()}`,
      expectStatus: 400
    }
  ],
  formatTime: [
    {
      name: 'ISO8601 date',
      value: new Date().toISOString().split('T')[1],
      expectStatus: 200
    },
    {
      name: 'other than ISO8601 date',
      value: `${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
      expectStatus: 400
    }
  ]
}

describe('test string', () => {
  describe('common', () => {
    const testCaseName = 'common'
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
  describe('length', () => {
    const testCaseName = 'length'
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
  describe('regex', () => {
    const testCaseName = 'regex'
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
  describe('formatDateTime', () => {
    const testCaseName = 'formatDateTime'
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
  describe('formatDate', () => {
    const testCaseName = 'formatDate'
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
  describe('formatTime', () => {
    const testCaseName = 'formatTime'
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
