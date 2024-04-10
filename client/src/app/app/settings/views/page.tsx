import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Messages } from './messages/messages'
import { Views } from './views/views'

export const metadata: Metadata = {
  title: 'Настройки оформления',
}

export default function ViewsPage() {
  return (
    <Wrapper width="50%" title="Настройки оформления">
      <Card hideButton width="50%" title="Внешний вид">
        <Views />
      </Card>

      <Card hideButton width="50%" title="Сообщения">
        <Messages />
      </Card>
    </Wrapper>
  )
}
