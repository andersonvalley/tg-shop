import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Заказы',
}

export default function Orders() {
  return <Wrapper title="Заказы">hello</Wrapper>
}
