import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { ContentModal } from './contentModal'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Доступы',
}

export default function Access() {
  return (
    <Wrapper width="50%" title="Доступы">
      <Card
        width="50%"
        title="Выданные доступы"
        modalContent={<ContentModal />}
        titleModal="Новый пользователь"
      >
        ul
      </Card>
    </Wrapper>
  )
}
