import ChainRequestMatcher from '../../../src/request/request-matcher/chain-request-matcher'
import RequestMatcherInterface from '../../../src/request/request-matcher/request-matcher-interface'
import RequestExamples from '../../features/request.examples'

class MockRequestMatcher implements RequestMatcherInterface {
  private result: boolean

  constructor(result: boolean) {
    this.result = result
  }

  matches(): boolean {
    return this.result
  }
}

describe('ChainRequestMatcher', () => {
  it.each([
    // Test cases for true matches
    {
      expected: true,
      matcherResults: [true, true, true],
    },
    {
      expected: true,
      matcherResults: [true, true, true, true],
    },
    // Test cases for false matches
    {
      expected: false,
      matcherResults: [true, false, true],
    },
    {
      expected: false,
      matcherResults: [true, true, false],
    },
  ])(
    'should match - matcherResults: $matcherResults, expected: $expected',
    ({ expected, matcherResults }) => {
      // Arrange
      const matchers = matcherResults.map(
        (result) => new MockRequestMatcher(result),
      )
      const chainMatcher = new ChainRequestMatcher(matchers)
      const request = RequestExamples.basic()

      // Act
      const match = chainMatcher.matches(request)

      // Assert
      expect(match).toBe(expected)
    },
  )
})
