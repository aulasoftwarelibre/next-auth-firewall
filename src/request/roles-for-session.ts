import { Session } from 'next-auth'

const USER_PROVIDER_URL = `${process.env.AUTH_URL as string}/firewall/`

export async function rolesForSession(
  auth?: Session | null,
): Promise<string[]> {
  const email = auth?.user?.email

  if (!email) {
    return []
  }

  const response = await fetch(USER_PROVIDER_URL as string, {
    body: JSON.stringify({ email }),
    headers: {
      Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    next: {
      tags: [`role-for-${email}`],
    },
  })

  if (!response.ok) {
    return []
  }

  const { roles } = await response.json()

  return roles
}
