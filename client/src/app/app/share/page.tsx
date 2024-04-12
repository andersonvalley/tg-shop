import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Share } from './share'
import { Card } from '@/src/components/UI/card/card'
import styles from './share.module.scss'
import Image from 'next/image'

import empty from '../../../assets/img/empty.png'
import { Empty } from '@/src/components/UI/empty/empty'
import { ShareModal } from './share.modal'

export const metadata: Metadata = {
  title: 'Рассылки',
}

export const emptyState = {
  text: '',
  photoLink: '',
  addButton: true,
}

export default function SharePage() {
  return (
    <Wrapper width="60%" title="Рассылки">
      <Share width="60%" />
      <Card
        width="60%"
        title="Завершенные рассылки"
        textButton="Создать рассылку"
        titleModal="Новая рассылка"
        modalContent={<ShareModal data={emptyState} />}
      >
        <ul className={styles.list}>
          <Empty />
          <li className={styles.item}>
            <span className={styles.date}>12.04.2024 в 13:46</span>
            <p className={styles.text}>
              Ghfjhf sf jh fsj hfjf shsjfhfhsj fhsj sfhf jsfh jfshsfj fhsj fhsf jsfhjfh fjshfjshfjs hfj fhj
              shf jsfhjsfh sfjhs fhj{' '}
            </p>
          </li>
          <li className={styles.item}>
            <span className={styles.date}>12.04.2024 в 13:46</span>
            <p className={styles.text}>Ghfjhf</p>
          </li>
        </ul>
      </Card>
    </Wrapper>
  )
}
