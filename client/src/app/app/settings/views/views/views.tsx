'use client'

import React from 'react'
import { Collapse, CollapseProps } from 'antd'
import { Avatar } from './content/avatar'

import '../views.scss'
import { Title } from './content/title'
import { Description } from './content/description'
import { Greetings } from './content/greetings'
import { Menu } from './content/menu'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Аватарка',
    children: <Avatar />,
  },
  {
    key: '2',
    label: 'Название магазина',
    children: <Title />,
  },
  {
    key: '3',
    label: 'Описание магазина',
    children: <Description />,
  },
  {
    key: '4',
    label: 'Приветствие',
    children: <Greetings />,
  },
  {
    key: '5',
    label: 'Название кнопки меню',
    children: <Menu />,
  },
]

export const Views = () => {
  return (
    <div className="collapse">
      <Collapse items={items} />
    </div>
  )
}
