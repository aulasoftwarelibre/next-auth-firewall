import { afterEach, describe, expect, it } from 'vitest'

import { isInternalRequest } from '../../src/request/is-internal-request'
import RequestExamples from '../features/request.examples'

describe('is-internal-request', () => {
  const environment = process.env

  afterEach(() => {
    process.env = environment
  })

  it('should returns true if request is internal', () => {
    // Arrange
    process.env = {
      ...environment,
      AUTH_SECRET: 'AUTH_SECRET',
    }
    const request = RequestExamples.internalAuthorized()

    // Act
    const response = isInternalRequest(request)

    // Assert
    expect(response).toBeTruthy()
  })

  it('should returns false if AUTH_SECRET is not configured', () => {
    // Arrange
    process.env = {
      ...environment,
    }
    const request = RequestExamples.internalAuthorized()

    // Act
    const response = isInternalRequest(request)

    // Assert
    expect(response).toBeFalsy()
  })

  it('should returns false if AUTH_SECRET is invalid', () => {
    // Arrange
    process.env = {
      ...environment,
      AUTH_SECRET: 'OTHER_AUTH_SECRET',
    }
    const request = RequestExamples.internalAuthorized()

    // Act
    const response = isInternalRequest(request)

    // Assert
    expect(response).toBeFalsy()
  })

  it('should returns false if request is external', () => {
    // Arrange
    process.env = {
      ...environment,
      AUTH_SECRET: 'AUTH_SECRET',
    }
    const request = RequestExamples.externalAuthorized()

    // Act
    const response = isInternalRequest(request)

    // Assert
    expect(response).toBeFalsy()
  })
})
