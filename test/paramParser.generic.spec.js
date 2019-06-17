import { createTestCases, positions } from './utils'

const cases = {
  default: {
    type: 'string',
    default: 'yay',
    minLength: 2
  },
  enum: {
    type: 'string',
    enum: ['enum1', 'enum2']
  },
  const: {
    type: 'string',
    'x-const': 'const' // this equal enum: ['const']
  }
}

const testSuites = {
  default: [
    {
      name: 'empty value',
      value: '', // default value will be used and it should pass minLength check
      expectStatus: 200
    },
    {
      name: 'other than empty value',
      value: '1',
      expectStatus: 400
    }
  ],
  enum: [
    {
      name: 'empty value',
      value: '',
      expectStatus: 400
    },
    {
      name: 'correct enum value',
      value: 'enum1',
      expectStatus: 200
    },
    {
      name: 'incorrect enum value',
      value: 'notenum1',
      expectStatus: 400
    }
  ],
  const: [
    {
      name: 'empty value',
      value: '',
      expectStatus: 400
    },
    {
      name: 'correct const value',
      value: 'const',
      expectStatus: 200
    },
    {
      name: 'incorrect const value',
      value: 'notconst',
      expectStatus: 400
    }
  ]
}

// cannot pass type null for request other than body in swagger 2
describe('test generic keywords', () => {
  describe('default', () => {
    const testCaseName = 'default'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.HEADER,
      positions.QUERY,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('enum', () => {
    const testCaseName = 'enum'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.HEADER,
      positions.QUERY,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('const', () => {
    const testCaseName = 'const'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [
      positions.BODY,
      positions.HEADER,
      positions.QUERY,
      positions.FORMDATA
    ]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
