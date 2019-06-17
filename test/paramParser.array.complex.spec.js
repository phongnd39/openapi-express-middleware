import { createTestCases, positions } from './utils'

const testTuple = [
  { type: 'number' },
  { type: 'string' },
  { type: 'boolean' },
  { type: 'integer' }
]
const cases = {
  arrayInArray: {
    type: 'array',
    items: {},
    'x-items': {
      type: 'array',
      'x-items': testTuple // attribute name items is okay here but using x-items
    }
  },
  multiLevelArrayInArray: {
    type: 'array',
    items: {},
    'x-items': {
      type: 'array',
      'x-items': {
        type: 'array',
        'x-items': testTuple // attribute name items is okay here but using x-items for persistence
      }
    }
  },
  objectInArray: {
    type: 'array',
    items: {},
    'x-items': {
      type: 'object',
      properties: {
        props1: { type: 'integer' },
        props2: { type: 'string' }
      }
    }
  },
  multiLevelObjectInArray: {
    type: 'array',
    items: {},
    'x-items': {
      type: 'object',
      properties: {
        props1: {
          type: 'object',
          properties: {
            props1: { type: 'integer' },
            props2: { type: 'string' }
          }
        },
        props2: { type: 'string' }
      }
    }
  }
}

const testSuites = {
  arrayInArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'correct array in array',
      value: [[1, 'a', true, 2, null], [1, 'a', true, 2, null], [1, 'a']],
      expectStatus: 200
    },
    {
      name: 'incorrect array in array',
      value: [[1, 'a', true, 2, null], [1, 'a', true, 2, null], [2, 3, 4]], // remember that type string will always pass in form-data
      expectStatus: 400
    }
  ],
  multiLevelArrayInArray: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'correct array in array',
      value: [
        [[1, 'a', true, 2, null], [1, 'a', true, 2, null], [1, 'a']],
        [[1, 'a', true, 2, null], [1, 'a', true, 2], [1, 'a']]
      ],
      expectStatus: 200
    },
    {
      name: 'incorrect element inside array in array',
      value: [
        [[1, 'a', true, 2, null], [1, 'a', true, 2, null], [1, 'a']],
        [[1, 'a', true, 2, null], [1, 'a', true, 2], [2, 3, 4]] // remember that type string will always pass in form-data
      ],
      expectStatus: 400
    },
    {
      name: 'incorrect array in array',
      value: [
        [[1, 'a', true, 2, null], [1, 'a', true, 2, null], [1, 'a']],
        ['a']
      ],
      expectStatus: 400
    }
  ],
  objectInArray: [
    {
      name: 'empty object',
      value: [{}],
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: [
        {
          props1: 1,
          props2: '2'
        }
      ],
      expectStatus: 200
    },
    {
      name: 'correct partial object',
      value: [
        {
          props2: '2'
        }
      ],
      expectStatus: 200
    },
    {
      name: 'correct object with extra attributes',
      value: [
        {
          props1: 1,
          props2: '2',
          props3: true
        }
      ],
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: [
        {
          props1: 'string',
          props2: 'string'
        }
      ],
      expectStatus: 400
    }
  ],
  multiLevelObjectInArray: [
    {
      name: 'empty object',
      value: [{}],
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: [
        {
          props1: {
            props1: 1,
            props2: '2'
          },
          props2: '2'
        }
      ],
      expectStatus: 200
    },
    {
      name: 'correct partial object',
      value: [
        {
          props2: '2'
        }
      ],
      expectStatus: 200
    },
    {
      name: 'correct partial children object',
      value: [
        {
          props1: {
            props1: 1
          }
        }
      ],
      expectStatus: 200
    },
    {
      name: 'correct object with extra attributes',
      value: [
        {
          props2: '2',
          props3: true
        }
      ],
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: [
        {
          props1: false,
          props2: 'string'
        }
      ],
      expectStatus: 400
    },
    {
      name: 'incorrect object',
      value: [
        {
          props1: {
            props1: 'string',
            props2: '2'
          },
          props2: 'string'
        }
      ],
      expectStatus: 400
    }
  ]
}

describe('test complex array', () => {
  // will just test this in body only
  // TODO: after define serialize array method, will retest this in header, query and form-data again
  describe('arrayInArray', () => {
    const testCaseName = 'arrayInArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY, positions.FORMDATA]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('multiLevelArrayInArray', () => {
    const testCaseName = 'multiLevelArrayInArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY, positions.FORMDATA]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('objectInArray', () => {
    const testCaseName = 'objectInArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY, positions.FORMDATA]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('multiLevelObjectInArray', () => {
    const testCaseName = 'multiLevelObjectInArray'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY, positions.FORMDATA]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
