import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { StartPage } from './Start'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Создать магазин',
}

export default async function Start() {
  return (
    <Wrapper width="43%" title="Создайте магазин">
      <StartPage />
    </Wrapper>
  )
}
