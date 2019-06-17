import { createTestCases, positions } from './utils'

const testTuple = [
  { type: 'number' },
  { type: 'string' },
  { type: 'boolean' },
  { type: 'integer' }
]
const cases = {
  contains: {
    type: 'array',
    items: {}, // swagger 2 requires items attribute
    'x-contains': {
      type: 'integer'
    }
  },
  tuple: {
    type: 'array',
    'x-items': testTuple,
    items: {} // swagger 2 requires items attribute
  },
  tupleAdditionalItemsFalse: {
    type: 'array',
    'x-items': testTuple,
    items: {}, // swagger 2 requires items attribute
    'x-additionalItems': false
  },
  tupleAdditionalItems: {
    type: 'array',
    items: {}, // swagger 2 requires items attribute
    'x-items': testTuple,
    'x-additionalItems': {
      type: 'integer'
    }
  },
  listLength: {
    type: 'array',
    items: {
      type: 'integer'
    },
    minItems: 1,
    maxItems: 3
  },
  tupleLength: {
    type: 'array',
    items: {}, // swagger 2 requires items attribute
    'x-items': testTuple,
    minItems: 1,
    maxItems: 3
  },
  unique: {
    type: 'array',
    items: {
      type: 'integer'
    },
    uniqueItems: true
  }
}

const testSuites = {
  contains: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 400
    },
    {
      name: 'contains value',
      value: ['a', true, 1],
      expectStatus: 200
    },
    {
      name: 'not contains value',
      value: ['a', 'a'],
      expectStatus: 400
    }
  ],
  tuple: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'full tuple',
      value: [1.5, 'string', true, 1],
      expectStatus: 200
    },
    {
      name: 'partial tuple',
      value: [1.5, 'string', true],
      expectStatus: 200
    },
    {
      name: 'wrong value tuple',
      value: [1.5, 1.5, 'string', true],
      expectStatus: 400
    }
  ],
  tupleAdditionalItemsFalse: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'full tuple',
      value: [1.5, 'string', true, 1],
      expectStatus: 200
    },
    {
      name: 'partial tuple',
      value: [1.5, 'string', true],
      expectStatus: 200
    },
    {
      name: 'wrong value tuple',
      value: [1.5, 1.5, 'string', true],
      expectStatus: 400
    },
    {
      name: 'extra value tuple',
      value: [1.5, 'string', true, 1, false],
      expectStatus: 400
    }
  ],
  tupleAdditionalItems: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'full tuple',
      value: [1.5, 'string', true, 1],
      expectStatus: 200
    },
    {
      name: 'partial tuple',
      value: [1.5, 'string', true],
      expectStatus: 200
    },
    {
      name: 'wrong value tuple',
      value: [1.5, 1.5, 'string', true],
      expectStatus: 400
    },
    {
      name: 'right extra value tuple',
      value: [1.5, 'string', true, 1, 1],
      expectStatus: 200
    },
    {
      name: 'wrong extra value tuple',
      value: [1.5, 'string', true, 1, 'string'],
      expectStatus: 400
    }
  ],
  listLength: [
    {
      name: 'empty array - array length smaller than minItems',
      value: [],
      expectStatus: 400
    },
    {
      name: 'array length equal minItems',
      value: [1],
      expectStatus: 200
    },
    {
      name: 'array length between minItems and maxItems',
      value: [1, 2],
      expectStatus: 200
    },
    {
      name: 'array length equal maxItems',
      value: [1, 2, 3],
      expectStatus: 200
    },
    {
      name: 'array length greater than maxItems',
      value: [1, 2, 3, 4],
      expectStatus: 400
    }
  ],
  tupleLength: [
    {
      name: 'empty array - array length smaller than minItems',
      value: [],
      expectStatus: 400
    },
    {
      name: 'array length equal minItems',
      value: [1],
      expectStatus: 200
    },
    {
      name: 'array length between minItems and maxItems',
      value: [1, '2'],
      expectStatus: 200
    },
    {
      name: 'array length equal maxItems',
      value: [1, '2', true],
      expectStatus: 200
    },
    {
      name: 'array length greater than maxItems',
      value: [1, '2', true, 4],
      expectStatus: 400
    }
  ],
  unique: [
    {
      name: 'empty array',
      value: [],
      expectStatus: 200
    },
    {
      name: 'unique array',
      value: [1, 2, 3, 4],
      expectStatus: 200
    },
    {
      name: 'not unique array',
      value: [1, 1, 2, 3],
      expectStatus: 400
    }
  ]
}

describe('test array operations', () => {
  describe('contains', () => {
    const testCaseName = 'contains'
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
  describe('tuple', () => {
    const testCaseName = 'tuple'
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
  describe('tupleAdditionalItemsFalse', () => {
    const testCaseName = 'tupleAdditionalItemsFalse'
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
  describe('tupleAdditionalItems', () => {
    const testCaseName = 'tupleAdditionalItems'
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
  describe('listLength', () => {
    const testCaseName = 'listLength'
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
  describe('tupleLength', () => {
    const testCaseName = 'tupleLength'
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
  describe('unique', () => {
    const testCaseName = 'unique'
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
