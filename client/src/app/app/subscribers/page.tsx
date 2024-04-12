import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Subscribers } from './subscribers'

export const metadata: Metadata = {
  title: 'Подписчики',
}

export default function SubscribersPage() {
  return (
    <Wrapper width="70%" title="Подписчики">
      <Subscribers />
    </Wrapper>
  )
}
