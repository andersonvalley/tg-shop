import { NextRequest, NextResponse } from 'next/server'
import { PATHS } from './constants/pages-url.config'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const refreshToken = cookies.get('refresh-token')?.value

  const isAuthPage = url.includes('/login')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(PATHS.START, request.url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*', '/login/:path'],
}
