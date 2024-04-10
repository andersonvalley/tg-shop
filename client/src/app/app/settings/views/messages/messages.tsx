'use client'

import React from 'react'
import { Collapse, CollapseProps } from 'antd'
import '../views.scss'
import { FirstLaunch } from './content/firstLaunch'
import { AfterOrder } from './content/afterOrder'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'При первом открытии',
    children: <FirstLaunch />,
  },
  {
    key: '2',
    label: 'После заказа',
    children: <AfterOrder />,
  },
]

export const Messages = () => {
  return (
    <div className="collapse">
      <Collapse items={items} />
    </div>
  )
}
