import { Metadata } from 'next'
import { Promocodes } from './promocode'

export const metadata: Metadata = {
  title: 'Настройки промокодов',
}

export default function PromocodesPage() {
  return <Promocodes />
}
