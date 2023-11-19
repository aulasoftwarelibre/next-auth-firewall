import { NextRequest } from 'next/server'

export default class RequestExamples {
  static basic(path: string = '/', options: { method?: string } = {}) {
    return new NextRequest(new URL(`http://internal${path}`), options)
  }

  static internalAuthorized() {
    return new NextRequest(new URL('http://internal'), {
      headers: {
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '::1',
      },
      method: 'POST',
    })
  }

  static externalAuthorized() {
    return new NextRequest(new URL('http://internal'), {
      headers: {
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '192.168.1.1',
      },
      method: 'POST',
    })
  }

  static firewallRequest() {
    return {
      headers: new Headers({
        authorization: 'Bearer AUTH_SECRET',
        'x-forwarded-for': '::1',
      }),
      json: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
      method: 'POST',
    } as unknown as NextRequest
  }
}
