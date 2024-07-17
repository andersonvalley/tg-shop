import { Metadata } from 'next'
import { Delivery } from './delivery'

export const metadata: Metadata = {
  title: `Интернет магазин | Доставка`,
}

export default function CartDeliveryPage() {
  return <Delivery />
}
