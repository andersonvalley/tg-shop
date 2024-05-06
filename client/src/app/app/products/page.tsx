import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Products } from './products'

export const metadata: Metadata = {
  title: 'Товары',
}

export default function OrdersPage() {
  return (
    <Wrapper width="60%" title="Добавьте товары">
      <Products />
    </Wrapper>
  )
}
