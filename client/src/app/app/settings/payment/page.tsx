import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Настройки оплаты',
}

export default function Payment() {
  return (
    <Wrapper width="50%" title="Настройки оплаты">
      <Card width="50%" title="Способы оплаты">
        <ul>fsffs</ul>
      </Card>
    </Wrapper>
  )
}
