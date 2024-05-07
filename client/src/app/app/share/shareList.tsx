'use client'

import React from 'react'

import styles from './share.module.scss'
import { useGet } from './fetch/useGet'
import { Empty } from '@/src/components/UI/empty/empty'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { useModalStore } from '@/src/store/modal.store'
import { ShareModal } from './share.modal'
import { Card } from '@/src/components/UI/card/card'
import { useGetSubscribers } from '../subscribers/fetch/useGetSubscribers'

export const emptyState = {
  text: '',
  photoLink: '',
  addButton: true,
  shopId: '',
}

export const ShareList = () => {
  const { items } = useGet()
  const { items: subscribers } = useGetSubscribers()

  return (
    <Card
      width="60%"
      title="Завершенные рассылки"
      textButton="Создать рассылку"
      titleModal="Новая рассылка"
      modalContent={<ShareModal subscribers={subscribers && subscribers.length} data={emptyState} />}
    >
      <ul className={styles.list}>
        {items && items.length === 0 && <Empty />}
        {items.map(item => {
          return (
            <li key={item.id} className={styles.item}>
              <span className={styles.date}>{normalizeDate(item.createdDate)}</span>
              <p className={styles.text}>{item.text}</p>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
