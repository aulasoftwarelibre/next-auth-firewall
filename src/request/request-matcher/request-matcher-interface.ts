import { NextRequest } from 'next/server'

export default interface RequestMatcherInterface {
  matches(request: Request | NextRequest): boolean
}
