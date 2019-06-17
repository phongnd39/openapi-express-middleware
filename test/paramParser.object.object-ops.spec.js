import { createTestCases, positions } from './utils'

const testProperties = {
  integer: { type: 'integer' },
  number: { type: 'number' },
  string: { type: 'string' },
  boolean: { type: 'boolean' },
  null: { type: 'null' },
  object: { type: 'object' },
  array: { type: 'array' }
}
const cases = {
  required: {
    type: 'object',
    properties: testProperties,
    required: ['integer', 'string']
  },
  propertyNames: {
    type: 'object',
    'x-propertyNames': {
      pattern: '^[A-Z_]*$' // all uppercase
    }
  },
  size: {
    type: 'object',
    minProperties: 1,
    maxProperties: 3
  },
  propertyDependencies: {
    type: 'object',
    properties: testProperties,
    'x-dependencies': {
      integer: ['string'] // if integer exist then string must exist in object
    }
  },
  schemaDependencies: {
    type: 'object',
    properties: testProperties,
    'x-dependencies': {
      integer: {
        properties: {
          dependentInteger: { const: 'dependentInteger' } // dependentInteger must have value of string 'dependentInteger'
        },
        required: ['dependentInteger']
      }
    }
  },
  patternProperties: {
    type: 'object',
    'x-patternProperties': {
      '^[A-Z_]*$': { type: 'boolean' } // all uppercase properties must be boolean
    }
  },
  additionalPropertiesAllow: {
    type: 'object',
    properties: testProperties,
    additionalProperties: {
      type: 'boolean' // all additional properties must be boolean
    }
  },
  additionalPropertiesNotAllow: {
    type: 'object',
    properties: testProperties,
    additionalProperties: false // NO additional property allow
  }
}

const testSuites = {
  required: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 400
    },
    {
      name: 'have required value, but not all required value object',
      value: {
        integer: 1,
        number: 1.5
      },
      expectStatus: 400
    },
    {
      name: 'have all required value object',
      value: {
        integer: 1,
        number: 1.5,
        string: 'string'
      },
      expectStatus: 200
    },
    {
      name: 'have all required value, but wrong type object',
      value: {
        integer: 'string',
        string: 'string'
      },
      expectStatus: 400
    }
  ],
  propertyNames: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: {
        TEST: 'test',
        ANOTHER_TEST: 'another test'
      },
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: {
        string: 'string',
        integer: 1
      },
      expectStatus: 400
    }
  ],
  size: [
    {
      name: 'empty object - properties number smaller than minProperties',
      value: {},
      expectStatus: 400
    },
    {
      name: 'properties number equal minProperties',
      value: {
        prop1: 'string'
      },
      expectStatus: 200
    },
    {
      name: 'properties number equal maxProperties',
      value: {
        prop1: 'string',
        prop2: 'string',
        prop3: 'string'
      },
      expectStatus: 200
    },
    {
      name: 'properties number between minProperties and maxProperties',
      value: {
        prop1: 'string',
        prop2: 'string'
      },
      expectStatus: 200
    },
    {
      name: 'properties number greater than maxProperties',
      value: {
        prop1: 'string',
        prop2: 'string',
        prop3: 'string',
        prop4: 'string',
        prop5: 'string'
      },
      expectStatus: 400
    }
  ],
  propertyDependencies: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'being dependent properties not exist',
      value: {
        number: 1.5
      },
      expectStatus: 200
    },
    {
      name:
        'being dependent properties exist but dependent properties not provided',
      value: {
        integer: 1
      },
      expectStatus: 400
    },
    {
      name: 'being dependent and dependent properties provided',
      value: {
        integer: 1,
        string: 'string'
      },
      expectStatus: 200
    }
  ],
  schemaDependencies: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'being dependent properties not exist',
      value: {
        number: 1.5
      },
      expectStatus: 200
    },
    {
      name:
        'being dependent properties exist but dependent properties not provided',
      value: {
        integer: 1
      },
      expectStatus: 400
    },
    {
      name: 'being dependent and dependent properties provided',
      value: {
        integer: 1,
        dependentInteger: 'dependentInteger'
      },
      expectStatus: 200
    }
  ],
  patternProperties: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: {
        integer: 1,
        PATTERN: true
      },
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: {
        integer: 1,
        PATTERN: 10
      },
      expectStatus: 400
    }
  ],
  additionalPropertiesAllow: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: {
        integer: 1,
        additional: true
      },
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: {
        integer: 1,
        additional: 10
      },
      expectStatus: 400
    }
  ],
  additionalPropertiesNotAllow: [
    {
      name: 'empty object',
      value: {},
      expectStatus: 200
    },
    {
      name: 'correct object',
      value: {
        integer: 1
      },
      expectStatus: 200
    },
    {
      name: 'incorrect object',
      value: {
        integer: 1,
        additional: true
      },
      expectStatus: 400
    }
  ]
}

describe('test object operations', () => {
  describe('required', () => {
    const testCaseName = 'required'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('propertyNames', () => {
    const testCaseName = 'propertyNames'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('size', () => {
    const testCaseName = 'size'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('propertyDependencies', () => {
    const testCaseName = 'propertyDependencies'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('schemaDependencies', () => {
    const testCaseName = 'schemaDependencies'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('patternProperties', () => {
    const testCaseName = 'patternProperties'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('additionalPropertiesAllow', () => {
    const testCaseName = 'additionalPropertiesAllow'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
  describe('additionalPropertiesNotAllow', () => {
    const testCaseName = 'additionalPropertiesNotAllow'
    const testCase = cases[testCaseName]
    const testSuite = testSuites[testCaseName]
    const testPositions = [positions.BODY]

    createTestCases(testCaseName, testCase, testPositions, testSuite)
  })
})
