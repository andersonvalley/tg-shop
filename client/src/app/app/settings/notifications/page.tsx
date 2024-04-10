import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Настройки уведомлений',
}

export default function Notification() {
  return (
    <Wrapper width="60%" title="Настройки уведомлений">
      <Card hideButton width="60%" title="Отправка заказов в Telegram-группу">
        ul
      </Card>
    </Wrapper>
  )
}
