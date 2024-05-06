import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { ShareAlert } from './shareAlert'
import { ShareList } from './shareList'

export const metadata: Metadata = {
  title: 'Рассылки',
}

export default function SharePage() {
  return (
    <Wrapper width="60%" title="Рассылки">
      <ShareAlert width="60%" />
      <ShareList />
    </Wrapper>
  )
}
