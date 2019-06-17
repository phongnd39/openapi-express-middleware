import { createTestCases, positions } from './utils'

const cases = {
  null: {
    'x-type': 'null'
  }
}

const testSuites = {
  null: [
    {
      name: 'null',
      value: null,
      expectStatus: 200
    },
    {
      name: 'other than null',
      value: 1,
      expectStatus: 400
    }
  ]
}

// cannot pass type null for request other than body in swagger 2
describe('test null', () => {
  describe('null', () => {
    const testCaseName = 'null'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
