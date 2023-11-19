import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextRequest } from 'next/server'

import RequestMatcherInterface from './request-matcher-interface'

export default class PathRequestMatcher implements RequestMatcherInterface {
  private readonly pathname: RegExp

  constructor(regexp: string) {
    this.pathname = new RegExp(regexp)
  }

  matches(request: Request | NextRequest): boolean {
    const url = new URL(request.url)

    return !!url.pathname.match(this.pathname)
  }
}
