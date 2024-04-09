import { Header } from '@/src/components/header/header'
import { Sidebar } from '@/src/components/sidebar/sidebar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="main main__app">
        <Sidebar />
        <section className="main__wrapper">{children}</section>
      </main>
    </>
  )
}
