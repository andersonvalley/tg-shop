import { ButtonMenu } from '@/src/components/UI/button/buttonMenu'
import { useValidate } from '@/src/hooks/useValidate'
import { createOrUpdateIGood } from '@/src/types/goods.interface'
import React from 'react'

interface Props {
  values: createOrUpdateIGood
  setValues: (type: any) => void
}

export const Options = ({ values, setValues }: Props) => {
  return (
    <>
      <p>Дополнительные предложения к товару</p>
      <span>Например: подарочная упаковка или соусы</span>
      <ButtonMenu>Добавить опцию</ButtonMenu>
    </>
  )
}
