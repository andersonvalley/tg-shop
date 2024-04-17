'use client'

import { Card } from '@/src/components/UI/card/card'
import { Table } from 'antd'
import React from 'react'
import { useGet } from './fetch/useGet'
import { columns } from './table/orders.columns'

export const Orders = () => {
  const { items, isLoading } = useGet()

  return (
    <Card width="80%" showHeader={false}>
      <Table loading={isLoading} dataSource={items} columns={columns} />
    </Card>
  )
}
