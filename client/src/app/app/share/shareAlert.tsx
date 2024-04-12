'use client'

import { Alert } from '@/src/components/UI/alert/alert'
import { PATHS } from '@/src/constants/pages-url.config'
import Link from 'next/link'
import React from 'react'

import styles from './share.module.scss'

interface Props {
  width: string
}

export const ShareAlert = ({ width }: Props) => {
  return (
    <div className={styles.wrapperAlert} style={{ maxWidth: width }}>
      <Alert local="share">
        Сообщайте подписчикам о новинках и акциях 😎 <br /> Рассылку получат все пользователи, которые{' '}
        <Link className={styles.link} href={PATHS.SUBSCRIBERS}>
          подписаны
        </Link>{' '}
        на ваш магазин.
      </Alert>
    </div>
  )
}
