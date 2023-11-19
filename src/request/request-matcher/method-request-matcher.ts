import { NextRequest } from 'next/server'

import RequestMatcherInterface from './request-matcher-interface'

export default class MethodRequestMatcher implements RequestMatcherInterface {
  private methods: string[]

  constructor(methods: string | string[]) {
    this.methods = this.normalizeMethods(methods)
  }

  private normalizeMethods(methods: string | string[]): string[] {
    return (Array.isArray(methods) ? methods : methods.split(',')).map(
      (method) => method.toUpperCase().trim(),
    )
  }

  matches(request: Request | NextRequest): boolean {
    return this.methods.includes(request.method.toUpperCase())
  }
}
