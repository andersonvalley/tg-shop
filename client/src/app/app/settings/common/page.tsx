import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'

export default function Common() {
  return (
    <Wrapper width="60%" title="Общие настройки">
      <Card hideButton width="60%" title="Настройки магазина">
        ul
      </Card>

      <Card hideButton danger width="60%" title="Удаление магазина">
        ul
      </Card>
    </Wrapper>
  )
}
