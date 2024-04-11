import { Header } from '@/src/components/header/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="main main__webApp">
        <section className="main__webApp-wrapper">{children}</section>
      </main>
    </>
  )
}
