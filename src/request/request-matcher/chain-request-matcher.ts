import { NextRequest } from 'next/server'

import RequestMatcherInterface from './request-matcher-interface'

export default class ChainRequestMatcher implements RequestMatcherInterface {
  constructor(private matchers: Iterable<RequestMatcherInterface>) {}

  matches(request: Request | NextRequest): boolean {
    for (const matcher of this.matchers) {
      if (!matcher.matches(request)) {
        return false
      }
    }

    return true
  }
}
