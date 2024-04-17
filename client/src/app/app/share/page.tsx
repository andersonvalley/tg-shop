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
import { useModalStore } from '@/src/store/modal.store'

export const metadata: Metadata = {
  title: 'Рассылки',
}

export default function SharePage() {
  return (
    <Wrapper width="60%" title="Рассылки">
      <ShareAlert width="60%" />
      <ShareList />
    </Wrapper>
  )
}
