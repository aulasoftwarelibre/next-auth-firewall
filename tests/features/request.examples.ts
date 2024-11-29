import { NextRequest } from 'next/server'
import { vi } from 'vitest'

const RequestExamples = {
  basic: (path: string = '/', options: { method?: string } = {}) => {
    return new NextRequest(new URL(`http://internal${path}`), options)
  },

  externalAuthorized: () => {
    return new NextRequest(new URL('http://internal'), {
      headers: {
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '192.168.1.1',
      },
      method: 'POST',
    })
  },

  firewallRequest: () => {
    return {
      headers: new Headers({
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '::1',
      }),
      json: vi.fn().mockResolvedValue({ email: 'test@example.com' }),
      method: 'POST',
    } as unknown as NextRequest
  },

  internalAuthorized: () => {
    return new NextRequest(new URL('http://internal'), {
      headers: {
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '::1',
      },
      method: 'POST',
    })
  },
}

export default RequestExamples
