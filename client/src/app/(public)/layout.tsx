import { HeaderLanding } from '@/src/components/header/headerLanding'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Войти в систему',
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderLanding />
      <main className="main main-login">{children}</main>
    </>
  )
}
