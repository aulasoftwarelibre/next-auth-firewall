import { describe, expect, it } from 'vitest'

import PathRequestMatcher from '../../../src/request/request-matcher/path-request-matcher'
import RequestExamples from '../../features/request.examples'

describe('PathRequestMatcher', () => {
  it.each([
    // Test cases for true matches
    { expected: true, path: '/admin/foo', regexp: '/admin/.*' },
    { expected: true, path: '/admin/foo', regexp: '/admin' },
    { expected: true, path: '/admin/foo', regexp: '^/admin/.*' },
    { expected: false, path: '/admin/foo', regexp: '/blog/.*' },
  ])(
    'should $path with $regexp to be $expected',
    ({ expected, path, regexp }) => {
      // Arrange
      const matcher = new PathRequestMatcher(regexp)

      // Act
      const match = matcher.matches(RequestExamples.basic(path))

      // Assert
      expect(match).toBe(expected)
    },
  )
})
