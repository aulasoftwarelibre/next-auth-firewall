import MethodRequestMatcher from '../../../src/request/request-matcher/method-request-matcher'
import RequestExamples from '../../features/request.examples'

describe('MethodRequestMatcher', () => {
  it.each([
    // Test cases for true matches
    { expected: true, matcherMethod: 'get', requestMethod: 'get' },
    { expected: true, matcherMethod: 'post,get', requestMethod: 'get' },
    { expected: true, matcherMethod: 'post, get', requestMethod: 'get' },
    { expected: true, matcherMethod: 'post,GET', requestMethod: 'get' },
    { expected: true, matcherMethod: ['get', 'post'], requestMethod: 'get' },
    { expected: true, matcherMethod: 'GET', requestMethod: 'get' },
    { expected: true, matcherMethod: ['GET', 'POST'], requestMethod: 'get' },

    // Test cases for false matches
    { expected: false, matcherMethod: 'post', requestMethod: 'get' },
    { expected: false, matcherMethod: 'POST', requestMethod: 'get' },
  ])(
    'should match - requestMethod: $requestMethod, matcherMethod: $matcherMethod, expected: $expected',
    ({ expected, matcherMethod, requestMethod }) => {
      // Arrange
      const matcher = new MethodRequestMatcher(matcherMethod)

      // Act
      const match = matcher.matches(
        RequestExamples.basic('/', { method: requestMethod }),
      )

      // Assert
      expect(match).toBe(expected)
    },
  )
})
