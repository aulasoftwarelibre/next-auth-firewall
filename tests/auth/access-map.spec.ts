import { describe, expect, it } from 'vitest'

import AccessMap from '../../src/auth/access-map'
import RequestMatcherInterface from '../../src/request/request-matcher/request-matcher-interface'
import RequestExamples from '../features/request.examples'

class MockRequestMatcher implements RequestMatcherInterface {
  constructor(private shouldMatch: boolean) {}

  matches(): boolean {
    return this.shouldMatch
  }
}

describe('AccessMap', () => {
  it('should return correct pattern based on request matcher result', () => {
    // Arrange
    const truthyMatcher = new MockRequestMatcher(true)
    const falsyMatcher = new MockRequestMatcher(false)

    const roleUser = ['ROLE_USER']
    const roleAdmin = ['ROLE_ADMIN']

    const accessMap = new AccessMap()
    accessMap.add(falsyMatcher, roleAdmin)
    accessMap.add(truthyMatcher, roleUser)

    const request = RequestExamples.basic()

    // Act
    const pattern = accessMap.pattern(request)

    // Assert
    expect(pattern).toEqual({ roles: roleUser })
  })

  it('should return correct empty pattern based on request matcher result', () => {
    // Arrange
    const truthyMatcher = new MockRequestMatcher(false)
    const falsyMatcher = new MockRequestMatcher(false)

    const roleUser = ['ROLE_USER']
    const roleAdmin = ['ROLE_ADMIN']

    const accessMap = new AccessMap()
    accessMap.add(falsyMatcher, roleAdmin)
    accessMap.add(truthyMatcher, roleUser)

    const request = RequestExamples.basic()

    // Act
    const pattern = accessMap.pattern(request)

    // Assert
    expect(pattern).toEqual({ roles: [] })
  })
})
