'use client'

import { Alert } from '@/src/components/UI/alert/alert'
import { PATHS } from '@/src/constants/pages-url.config'
import Link from 'next/link'
import React from 'react'

import styles from './subscribers.module.scss'
import { Card } from '@/src/components/UI/card/card'
import { Table } from 'antd'
import { columns } from './table/subscribers.columns'
import { useGet } from './fetch/useGet'

export const Subscribers = () => {
  const { items, isLoading } = useGet()

  return (
    <>
      <Alert local="subscribers">
        <b>Подписчики</b> — это люди, которые зашли в ваш магазин. Теперь их данные хранятся здесь, а вы
        можете отправлять им{' '}
        <Link className={styles.link} href={PATHS.SHARE}>
          рассылки
        </Link>{' '}
        👌
      </Alert>

      <Card showHeader={false}>
        <Table loading={isLoading} dataSource={items} columns={columns} />
      </Card>
    </>
  )
}