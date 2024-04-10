'use client'

import React from 'react'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { useDeleteShop } from './useShopDelete'
import { useShopStore } from '@/src/store/shop.state'

export const Common = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { mutate } = useDeleteShop()
  const deleteShopHandler = () => {
    mutate(id)
  }

  return (
    <>
      <h3>Удаление магазина</h3>
      <p>Удалим заказы, подписчиков, товары и интеграции. Восстановить уже не получится.</p>

      <SubmitButton onClick={deleteShopHandler} type="button" className="danger">
        Удалить магазин
      </SubmitButton>
    </>
  )
}
