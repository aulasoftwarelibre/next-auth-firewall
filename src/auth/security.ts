import { NextRequest } from 'next/server'
import { Session } from 'next-auth'

import ChainRequestMatcher from '../request/request-matcher/chain-request-matcher'
import MethodRequestMatcher from '../request/request-matcher/method-request-matcher'
import PathRequestMatcher from '../request/request-matcher/path-request-matcher'
import RequestMatcherInterface from '../request/request-matcher/request-matcher-interface'
import { rolesForSession } from '../request/roles-for-session'
import { AccessControl } from '../types'
import AccessMap from './access-map'

interface SecurityConfig {
  accessControlRules: AccessControl[]
}

class Security {
  private accessMap: AccessMap

  constructor(private readonly config: SecurityConfig) {
    this.accessMap = this.createAccessMap(config)
  }

  async authorized(parameters: {
    auth: Session | null
    request: Request | NextRequest
  }): Promise<boolean> {
    const { auth, request } = parameters
    const { roles } = this.accessMap.pattern(request)

    if (!roles || roles.includes('PUBLIC_ACCESS')) {
      return true
    }

    const currentRoles = await rolesForSession(auth)

    if (currentRoles.length > 0 && roles.includes('IS_AUTHENTICATED')) {
      return true
    }

    return currentRoles.some((role) => (roles as string[]).includes(role))
  }

  private createAccessMap(config: SecurityConfig) {
    const accessMap = new AccessMap()

    for (const accessControlRule of config.accessControlRules) {
      const { roles, ...matchers } = accessControlRule

      const matcher = this.createRequestMatcher(matchers)

      accessMap.add(matcher, roles)
    }

    return accessMap
  }

  private createRequestMatcher(rules: Omit<AccessControl, 'roles'>) {
    const { methods, path } = rules

    const matchers: RequestMatcherInterface[] = []

    if (methods) {
      matchers.push(new MethodRequestMatcher(methods))
    }

    if (path) {
      matchers.push(new PathRequestMatcher(path))
    }

    return new ChainRequestMatcher(matchers)
  }
}

export default Security
