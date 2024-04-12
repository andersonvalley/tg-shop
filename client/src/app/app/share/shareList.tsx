'use client'

import React from 'react'

import styles from './share.module.scss'
import { useGet } from './fetch/useGet'
import { Empty } from '@/src/components/UI/empty/empty'
import { normalizeDate } from '@/src/utils/normalizeDate'

export const ShareList = () => {
  const { items } = useGet()

  return (
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
  )
}
