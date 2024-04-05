import { Header } from '@/src/components/header/header'
import { Sidebar } from '@/src/components/sidebar/sidebar'
import { InitRequests } from './initRequests'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'bla bla',
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <InitRequests>
      <Header />
      <main className="main main__app">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        <section className="main__wrapper">{children}</section>
      </main>
    </InitRequests>
  )
}
