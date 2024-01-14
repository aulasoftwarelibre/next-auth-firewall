import { NextRequest } from 'next/server'

const INTERNAL_ADDRESS = process.env.INTERNAL_ADDRESS
  ? new Set(process.env.INTERNAL_ADDRESS.split(','))
  : new Set(['127.0.0.1', '::ffff:127.0.0.1', '::1'])

function isInternalRequest(request: NextRequest): boolean {
  const authorization = request.headers.get('authorization')
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (!process.env?.AUTH_SECRET) {
    console.warn('Set AUTH_SECRET environment variable')

    return false
  }

  if (
    authorization !== `Bearer ${process.env?.AUTH_SECRET}` ||
    !forwardedFor ||
    !INTERNAL_ADDRESS.has(forwardedFor) ||
    request.method.toUpperCase() !== 'POST'
  ) {
    console.warn(
      `Unsecure internal request. Check ForwardedFor header and AUTH_SECRET environment variable.`,
      {
        method: request.method,
        remoteAddress: forwardedFor,
      },
    )
    return false
  }

  return true
}

export { isInternalRequest }
