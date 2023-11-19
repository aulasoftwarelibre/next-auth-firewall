import { NextRequest } from 'next/server'
import NextAuth, { NextAuthResult } from 'next-auth'

import AuthFirewall from './auth/auth-firewall'
import Authorized from './auth/authorized'
import { NextAuthFirewallConfig } from './types'

export type * from './types'

type AppRouteHandlers = Record<'POST', (req: NextRequest) => Promise<Response>>

export interface NextAuthFirewallResult extends NextAuthResult {
  firewallHandler: AppRouteHandlers
}

export default function NextAuthFirewall(
  config: NextAuthFirewallConfig,
): NextAuthFirewallResult {
  const { accessControl, callbacks = {}, ...rest } = config

  const firewallHttpHandler = (req: NextRequest) => AuthFirewall(req, config)

  const nextAuth = NextAuth({
    callbacks: {
      ...callbacks,
      authorized: Authorized(config),
    },
    ...rest,
  })

  return {
    firewallHandler: {
      POST: firewallHttpHandler,
    } as const,
    ...nextAuth,
  }
}
