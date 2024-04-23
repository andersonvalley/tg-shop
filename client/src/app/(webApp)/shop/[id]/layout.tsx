import Script from 'next/script'
import { Footer } from '../../components/footer/footer'
import { HeaderWebApp } from '../../components/header/header'

import './webapp.scss'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <HeaderWebApp />
      <main className="main main__webApp">
        <section className="main__webApp-wrapper">{children}</section>
      </main>
      <Footer />
    </Providers>
  )
}
