import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'nosait-secret-key-change-in-production'

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string }
  } catch {
    return null
  }
}

export function getAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  return verifyToken(token)
}

export async function setAuthCookie(token: string) {
  const cookieStore = cookies()

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export function removeAuthCookie() {
  cookies().delete('token')
}