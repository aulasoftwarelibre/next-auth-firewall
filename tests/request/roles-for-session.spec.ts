import { Session } from '@auth/core/types'

import rolesForSession from '../../src/request/roles-for-session'

describe('rolesForSession', () => {
  it('should return roles for a valid session', async () => {
    // Arrange
    const mockSession = {
      user: {
        email: 'test@example.com',
      },
    } as unknown as Session

    // Mock the fetch function
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ roles: ['ROLE_USER'] }),
      ok: true,
    } as unknown as Response)

    // Act
    const result = await rolesForSession(mockSession)

    // Assert
    expect(result).toEqual(['ROLE_USER'])
  })

  it('should return an empty array for an invalid session', async () => {
    // Arrange
    const mockSession = null

    // Act
    const result = await rolesForSession(mockSession)

    // Assert
    expect(result).toEqual([])
  })

  it('should return an empty array for a failed request', async () => {
    // Arrange
    const mockSession = {
      user: {
        email: 'test@example.com',
      },
    } as unknown as Session

    // Mock the fetch function to simulate a failed request
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as Response)

    // Act
    const result = await rolesForSession(mockSession)

    // Assert
    expect(result).toEqual([])
  })
})
