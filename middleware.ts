import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // حماية الداشبورد
  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const user: any = verifyToken(token)

      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // منع دخول صفحة اللوجين لو الأدمن مسجل بالفعل
  if (pathname === '/admin/login' && token) {
    try {
      const user: any = verifyToken(token)

      if (user && user.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    } catch (error) {}
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}