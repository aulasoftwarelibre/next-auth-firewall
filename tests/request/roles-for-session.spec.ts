import { Session } from 'next-auth'
import { describe, expect, it, vi } from 'vitest'

import { rolesForSession } from '../../src/request/roles-for-session'

describe('rolesForSession', () => {
  it('should return roles for a valid session', async () => {
    // Arrange
    const mockSession = {
      user: {
        email: 'test@example.com',
      },
    } as unknown as Session

    // Mock the fetch function
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue({ roles: ['ROLE_USER'] }),
      ok: true,
    } as unknown as Response)

    // Act
    const result = await rolesForSession(mockSession)

    // Assert
    expect(result).toEqual(['ROLE_USER'])
  })

  it('should return an empty array for an invalid session', async () => {
    // Arrange
    const mockSession = undefined

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
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response)

    // Act
    const result = await rolesForSession(mockSession)

    // Assert
    expect(result).toEqual([])
  })
})
