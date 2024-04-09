'use client'

import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { ContentModal } from './contentModal'
import { ListItem } from '@/src/components/UI/list/listItem'
import { Switch } from 'antd'
import { useState } from 'react'

export default function Promocodes() {
  const [items, setItems] = useState([
    {
      title: 'Самовывозом',
      id: 1,
      isActive: true,
    },
  ])

  const updateIsActive = (checked: boolean, item) => {
    const updated = items.map(current => {
      if (current.id === item.id) {
        return { ...current, isActive: checked }
      }
      return current
    })

    setItems(updated)
  }

  return (
    <Wrapper width="50%" title="Настройки промокодов">
      <Card width="50%" title="Промокоды" modalContent={<ContentModal />} titleModal="Новый промокод">
        <ul>
          {items.map(item => {
            return (
              <ListItem key={item.id}>
                <label className="switch switchMargin">
                  <Switch value={item.isActive} onChange={checked => updateIsActive(checked, item)} />{' '}
                  <span>Имя</span>
                </label>

                <p className="description">{item?.description}</p>
              </ListItem>
            )
          })}
        </ul>
      </Card>
    </Wrapper>
  )
}
