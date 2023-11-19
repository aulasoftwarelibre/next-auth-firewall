import { NextRequest } from 'next/server'

import { isInternalRequest } from '../request/is-internal-request'
import { NextAuthFirewallConfig } from '../types'

export default async function AuthFirewall(
  request: NextRequest,
  config: NextAuthFirewallConfig,
): Promise<Response> {
  const { adapter } = config

  if (!adapter || !adapter.getUserByEmail) {
    console.warn('This plugin requires an adapter with getUserByEmail support')

    return Response.json(
      {
        error: {
          code: 500,
          details:
            'The server encountered an internal error. Please check the configuration settings.',
          hint: 'Check you configure an adapter and this adapter supports `getUserByEmail`.',
          message: 'Internal Server Error',
        },
      },
      { status: 500 },
    )
  }

  if (!isInternalRequest(request)) {
    return Response.json({
      error: {
        code: 403,
        details:
          'Access to the requested resource is forbidden due to unauthorized IP address.',
        message: 'Forbidden',
      },
    })
  }

  const { email } = (await request.json()) || {}

  if (!email) {
    console.warn('Request does not contains the email')

    return Response.json({ roles: [] })
  }

  const { roles = [] } =
    ((await adapter.getUserByEmail(email)) as { roles?: string[] }) || {}

  return Response.json({ roles })
}
