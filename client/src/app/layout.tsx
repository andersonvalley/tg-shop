import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { SITE_NAME } from '../constants/seo.constants'
import { Providers } from './providers'

import '../styles/global.scss'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['100', '300', '500', '600'], variable: '--ff' })

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Интернет-магазин в Telegram — это бот. Создается за 20 минут. Без программистов. Собирает базу посетителей и делает push-рассылки.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
