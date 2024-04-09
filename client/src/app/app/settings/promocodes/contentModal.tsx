'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { SelectUi } from '@/src/components/UI/select/select'

import { useValidate } from '@/src/hooks/useValidate'
import React, { useState } from 'react'

export interface formType {
  title: string
  description: string
  price: string
  priceFrom: string
  apply: string
}

export const ContentModal = () => {
  const [values, setValues] = useState<formType>({
    title: '',
    description: '',
    price: '',
    priceFrom: '',
    apply: 'first',
  })

  const { onChange } = useValidate()

  return (
    <form>
      <Input
        label="Промокод"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder="SALE10"
      />
      <Input
        label="Описание"
        labelHelper="Будет видно только вам"
        value={values.description}
        onChange={e => setValues({ ...values, description: e.target.value })}
        placeholder="Скидка 20% на первый заказ"
      />

      <SelectUi
        defaultValue="first"
        onChange={value => setValues({ ...values, apply: value })}
        label="Как применяется"
        options={[
          { value: 'first', label: 'Только к первому заказу' },
          { value: 'all', label: 'Без ограничений' },
        ]}
      />

      <Input
        label="Скидка"
        value={values.price}
        onChange={e => onChange(e.target.value, value => setValues({ ...values, price: value }))}
        placeholder="0"
        width="50%"
      />

      <div className="flex">
        <Input
          label="Для заказов от"
          value={values.priceFrom}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
          placeholder="0"
          width="50%"
          icon="₽"
        />

        <SelectUi
          margin="10px"
          width="70px"
          defaultValue="percent"
          onChange={value => setValues({ ...values, apply: value })}
          options={[
            { value: 'price', label: '₽' },
            { value: 'percent', label: '%' },
          ]}
        />
      </div>

      <div className="line"></div>
      <SubmitButton>Добавить способ</SubmitButton>
    </form>
  )
}
