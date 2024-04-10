import { Metadata } from 'next'
import { Common } from './common'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Card } from '@/src/components/UI/card/card'

export const metadata: Metadata = {
  title: 'Общие настройки',
}

export default function CommonPage() {
  return (
    <Wrapper width="60%" title="Общие настройки">
      <Card hideButton danger width="60%" title="Удаление магазина">
        <Common />
      </Card>
    </Wrapper>
  )
}
