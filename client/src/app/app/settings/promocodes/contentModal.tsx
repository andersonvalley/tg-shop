'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { SelectUi } from '@/src/components/UI/select/select'

import { useValidate } from '@/src/hooks/useValidate'
import { IPromocode } from '@/src/types/promocode.interface'
import React, { useState } from 'react'
import { useCreate } from './fetch/useCreate'
import { useUpdate } from './fetch/useUpdate'

export interface Props {
  data: IPromocode
  update?: boolean
}

export const ContentModal = ({ data, update }: Props) => {
  const [values, setValues] = useState<IPromocode>(data)

  const { onChange } = useValidate()

  const { createDeliveryHandler } = useCreate()
  const { updateDeliveryHandler } = useUpdate()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (update) updateDeliveryHandler(values)
    else createDeliveryHandler(values)
  }

  return (
    <form onSubmit={e => submit(e)}>
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
        value={values.discount}
        onChange={e => onChange(e.target.value, value => setValues({ ...values, discount: value }))}
        placeholder="0"
        width="50%"
      />

      <div className="flex">
        <Input
          label="Для заказов от"
          value={values.orderFrom}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, orderFrom: value }))}
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
