import { Metadata } from 'next'
import { Payment } from './payment'

export const metadata: Metadata = {
  title: 'Настройки оплаты',
}

export default function DeliveryPage() {
  return <Payment />
}
