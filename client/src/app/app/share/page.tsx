import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { ShareAlert } from './shareAlert'
import { Card } from '@/src/components/UI/card/card'
import styles from './share.module.scss'
import Image from 'next/image'

import empty from '../../../assets/img/empty.png'
import { Empty } from '@/src/components/UI/empty/empty'
import { ShareModal } from './share.modal'
import { ShareList } from './shareList'

export const metadata: Metadata = {
  title: 'Рассылки',
}

export const emptyState = {
  text: '',
  photoLink: '',
  addButton: true,
  shopId: '',
}

export default function SharePage() {
  return (
    <Wrapper width="60%" title="Рассылки">
      <ShareAlert width="60%" />
      <Card
        width="60%"
        title="Завершенные рассылки"
        textButton="Создать рассылку"
        titleModal="Новая рассылка"
        modalContent={<ShareModal data={emptyState} />}
      >
        <ShareList />
      </Card>
    </Wrapper>
  )
}
