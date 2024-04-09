import { Metadata } from 'next'
import { Delivery } from './delivery'

export const metadata: Metadata = {
  title: 'Настройки оплаты',
}

export default function DeliveryPage() {
  return <Delivery />
}
