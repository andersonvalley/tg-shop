import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { StartComponent } from './startComponent'

export const metadata: Metadata = {
  title: 'Создать магазин',
}

export default async function StartPage() {
  return (
    <Wrapper width="80%" title="Создайте магазин">
      <StartComponent />
    </Wrapper>
  )
}
