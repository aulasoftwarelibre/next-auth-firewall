import { NextAuthConfig } from 'next-auth'

/**
 * Defines an access control rule to restrict or allow access to a specific route based on HTTP methods, URL path,
 * and required user roles.
 */
export interface AccessControl {
  /**
   * One or many HTTP methods allowed for the access control rule.
   * @example
   * - 'GET'
   * - ['POST', 'PUT']
   */
  methods?: string | string[]

  /**
   * A regular expression representing the URL path. It is used to match the current URL path
   * (excluding hostname and port) against the defined pattern.
   * @example
   * - '/public'
   * - '/admin/*'
   */
  path: string

  /**
   * The roles that a user must possess to match the access control rule.
   * - 'PUBLIC_ACCESS': Allows anyone to access, even if not authenticated.
   * - 'IS_AUTHENTICATED': Requires a valid user session to exist.
   * - Other roles can be determined by the programmer (e.g., 'ROLE_ADMIN', 'ROLE_USER').
   */
  roles: AccessControlRole
}

/**
 * Represents the different types of roles accepted in access control rules.
 */
export type AccessControlRole =
  | InternalRole
  | InternalRole[]
  | string
  | string[]

/**
 * Represents internal roles used in access control rules.
 */
export type InternalRole = 'IS_AUTHENTICATED' | 'PUBLIC_ACCESS'

export interface NextAuthFirewallConfig extends NextAuthConfig {
  /**
   * An array of access control rules to restrict or allow access to specific routes based on user roles.
   *
   * Access control rules are defined by the {@link AccessControl} interface and determine which users can access
   * specific routes based on HTTP methods, URL paths, and required user roles.
   *
   * @example
   * ```typescript
   * const accessControl: AccessControl[] = [
   *   { methods: 'GET', path: '/public', roles: 'PUBLIC_ACCESS' },
   *   { methods: ['POST', 'PUT'], path: '/admin', roles: ['ROLE_ADMIN', 'IS_AUTHENTICATED'] },
   *   // Add more access control rules as needed
   * ];
   */
  accessControl: AccessControl[]
}
