import { Session } from '@auth/core/types'

import Security from '../../src/auth/security'
import RequestExamples from '../features/request.examples'

jest.mock('../../src/request/roles-for-session')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rolesForSession = require('../../src/request/roles-for-session').default

describe('Security', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  const mockAccessControlRules = [
    { methods: 'POST', path: '^/product', roles: 'ROLE_USER' },
    { path: '^/private', roles: ['IS_AUTHENTICATED'] },
    { path: '^/admin', roles: ['ROLE_ADMIN'] },
    { path: '^/', roles: ['PUBLIC_ACCESS'] },
  ]

  it('should authorize access to public access paths', async () => {
    // Arrange
    const mockRequest = RequestExamples.basic('/')
    const security = new Security({
      accessControlRules: mockAccessControlRules,
    })

    // Act
    const result = await security.authorized({
      auth: {} as Session,
      request: mockRequest,
    })

    // Assert
    expect(result).toBe(true)
  })

  it('should authorize access to private access with a session', async () => {
    // Arrange
    rolesForSession.mockImplementation(async () => ['ROLE_USER'])

    const mockRequest = RequestExamples.basic('/private')
    const security = new Security({
      accessControlRules: mockAccessControlRules,
    })

    // Act
    const result = await security.authorized({
      auth: {} as Session,
      request: mockRequest,
    })

    // Assert
    expect(result).toBeTruthy()
  })

  it('should not authorize access to private access without a session', async () => {
    // Arrange
    rolesForSession.mockImplementation(async () => [])

    const mockRequest = RequestExamples.basic('/private')
    const security = new Security({
      accessControlRules: mockAccessControlRules,
    })

    // Act
    const result = await security.authorized({
      auth: {} as Session,
      request: mockRequest,
    })

    // Assert
    expect(result).toBe(false)
  })

  it('should not authorize a request with authenticated access and invalid roles', async () => {
    // Arrange
    rolesForSession.mockImplementation(async () => ['ROLE_USER'])

    const mockRequest = RequestExamples.basic('/admin')
    const security = new Security({
      accessControlRules: mockAccessControlRules,
    })

    // Act
    const result = await security.authorized({
      auth: {} as Session,
      request: mockRequest,
    })

    // Assert
    expect(result).toBe(false)
  })
})
