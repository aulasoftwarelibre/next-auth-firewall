import { NextAuthFirewallConfig } from '../../src'
import AuthFirewall from '../../src/auth/auth-firewall'
import RequestExamples from '../features/request.examples'

describe('AuthFirewall', () => {
  const environment = process.env

  beforeEach(() => {
    process.env = {
      ...environment,
      AUTH_SECRET: 'AUTH_SECRET',
    }
  })

  afterEach(() => {
    process.env = environment
  })

  it('should return user roles from email', async () => {
    // Arrange
    const request = RequestExamples.firewallRequest()

    const mockAdapter = {
      getUserByEmail: jest.fn().mockResolvedValue({ roles: ['ROLE_USER'] }),
    }

    const mockConfig = {
      adapter: mockAdapter,
    } as unknown as NextAuthFirewallConfig

    // Act
    const response = await AuthFirewall(request, mockConfig)

    // Assert
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ roles: ['ROLE_USER'] })
  })
})
