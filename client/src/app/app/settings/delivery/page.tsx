import { Metadata } from 'next'
import { Delivery } from './delivery'

export const metadata: Metadata = {
  title: 'Настройки доставки',
}

export default function DeliveryPage() {
  return <Delivery />
}
