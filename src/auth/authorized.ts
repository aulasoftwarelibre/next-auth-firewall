import { NextRequest } from 'next/server'
import { Session } from 'next-auth'

import { NextAuthFirewallConfig } from '../types'
import Security from './security'

export default function Authorized(config: NextAuthFirewallConfig) {
  const { accessControl: accessControlRules } = config

  const security = new Security({ accessControlRules })

  return (parameters: { auth: Session | null; request: NextRequest }) =>
    security.authorized(parameters)
}
