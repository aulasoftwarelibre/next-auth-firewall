import { Session } from '@auth/core/types'
import { NextRequest } from 'next/server'

import { NextAuthFirewallConfig } from '../types'
import Security from './security'

export default function Authorized(config: NextAuthFirewallConfig) {
  const { accessControl: accessControlRules } = config

  const security = new Security({ accessControlRules })

  return (params: { auth: Session | null; request: NextRequest }) =>
    security.authorized(params)
}
