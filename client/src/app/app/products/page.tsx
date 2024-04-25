import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Products } from './products'
import { Category } from '../catalog/category'

export const metadata: Metadata = {
  title: 'Товары',
}

export default function OrdersPage() {
  return (
    <Wrapper width="80%" title="Товары">
      <Products />
    </Wrapper>
  )
}
