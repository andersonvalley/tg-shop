import { Metadata } from 'next'
import { MainPage } from '../components/landing/mainPage'
import { SITE_NAME } from '../constants/seo.constants'

export const metadata: Metadata = {
  title: `Создайте магазин в Telegram | ${SITE_NAME}`,
}

export default function Home() {
  return <MainPage />
}
