'use client'

import React, { useState } from 'react'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { useCreate } from './fetch/useCreate'
import { useUpdate } from './fetch/useUpdate'

import { IPayment } from '@/src/types/payment.interface'

export interface Props {
  data: IPayment
  update?: boolean
}

export const ContentModal = ({ data, update }: Props) => {
  const [values, setValues] = useState<IPayment>(data)

  const { createHandler } = useCreate()
  const { updatePaymentHandler } = useUpdate()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (update) updatePaymentHandler(values)
    else createHandler(values)
  }

  return (
    <form onSubmit={e => submit(e)}>
      <Input
        label="Название"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder="Наличными или переводом"
      />

      <div className="line"></div>
      <SubmitButton>Добавить способ</SubmitButton>
    </form>
  )
}
