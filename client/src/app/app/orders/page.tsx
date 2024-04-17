import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Orders } from './orders'

export const metadata: Metadata = {
  title: 'Заказы',
}

export default function OrdersPage() {
  return (
    <Wrapper width="80%" title="Заказы">
      <Orders />
    </Wrapper>
  )
}
