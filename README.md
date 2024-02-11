# RBAC NextAuth.js firewall

⚠️ Warning: This is a Proof of Concept (PoC), and it is not production-ready. Use with caution and provide feedback for improvements. Thanks!

This package is a plugin for [NextAuth](https://next-auth.js.org/) version 5 that adds a
Role-Based Access Control (RBAC) authorization layer to your authentication setup. 
The RBAC implementation is inspired by [Symfony](https://symfony.com).

## Installation

To install the `@aulasoftwarelibre/next-auth-firewall` package, run:

```bash yarn2npm
npm install @aulasoftwarelibre/next-auth-firewall
```

## Setup

### Change auth.ts

Replace the content of your auth.ts file with the following code:

```typescript
import NextAuthFirewall from '@aulasoftwarelibre/next-auth-firewall'
import authConfig from '@/lib/auth/auth.config'

export const {
  auth,
  firewallHandler,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuthFirewall(authConfig)
```

### Change middleware.ts

Update your middleware.ts file with the following code:

```typescript
import NextAuthFirewall from '@aulasoftwarelibre/next-auth-firewall'
import authConfig from '@/lib/auth/auth.config'

export default NextAuthFirewall(authConfig).auth

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Add Firewall Router

Create a new file src/app/api/auth/firewall/route.ts and add the following code:

```typescript
import { firewallHandler } from '@/lib/auth/auth'

const { POST } = firewallHandler

export { POST }
```

### Update auth.config.ts

Modify your auth.config.ts file to replace the authorize callback with access control rules. Here's an example:

```typescript
import type { NextAuthFirewallConfig } from '@aulasoftwarelibre/next-auth-firewall'

const authConfig = {
    accessControl: [
        {
            path: '^/(signout|settings)',
            roles: 'IS_AUTHENTICATED',
        },
        {
            path: '^/',
            roles: 'PUBLIC_ACCESS',
        },
    ],
    // ...
} as NextAuthFirewallConfig

export default authConfig
```

Make sure to configure the adapter as per your requirements.

