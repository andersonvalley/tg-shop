import { Header } from '@/src/components/header/header'
import { Sidebar } from '@/src/components/sidebar/sidebar'
import { Suspense } from 'react'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="main main__app">
        <Suspense>
          <Sidebar />
          <section className="main__wrapper">{children}</section>
        </Suspense>
      </main>
    </>
  )
}
