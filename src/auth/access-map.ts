import { NextRequest } from 'next/server'

import RequestMatcherInterface from '../request/request-matcher/request-matcher-interface'
import { AccessControlRole, InternalRole } from '../types'

interface AccessMapEntry {
  matcher: RequestMatcherInterface
  roles: string[]
}

interface AccessMapPattern {
  roles: string[] | InternalRole[] | null
}

export default class AccessMap {
  private readonly map: AccessMapEntry[]

  constructor() {
    this.map = []
  }

  add(matcher: RequestMatcherInterface, roles: AccessControlRole) {
    this.map.push({ matcher, roles: Array.isArray(roles) ? roles : [roles] })
  }

  pattern(request: Request | NextRequest): AccessMapPattern {
    for (const accessMap of this.map) {
      if (accessMap.matcher === null || accessMap.matcher.matches(request)) {
        const { roles } = accessMap

        return { roles }
      }
    }

    return { roles: null }
  }
}
