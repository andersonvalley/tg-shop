'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { useValidate } from '@/src/hooks/useValidate'
import { Switch, Tooltip } from 'antd'
import React, { useState } from 'react'
import { IoIosHelpCircleOutline } from 'react-icons/io'

import { IDelivery } from '@/src/types/delivery.interface'

import styles from './delivery.module.scss'
import { useCreate } from './fetch/useCreate'
import { useUpdate } from './fetch/useUpdate'

export interface Props {
  data: IDelivery
  update?: boolean
}

export const ContentModal = ({ data, update }: Props) => {
  const [values, setValues] = useState<IDelivery>(data)

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
        label="Название"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder="Самовывоз"
      />
      <Input
        label="Описание"
        labelHelper="Текст появится на странице оформления заказа при выборе этого способа доставки"
        value={values.description}
        onChange={e => setValues({ ...values, description: e.target.value })}
        placeholder="Адрес самовывоза"
      />
      <Input
        label="Стоимость"
        value={values.price}
        onChange={e => onChange(e.target.value, value => setValues({ ...values, price: value }))}
        placeholder="0"
        width="50%"
        icon="₽"
      />
      <Input
        label="Беспалатно от"
        value={values.priceFrom}
        onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
        placeholder="0"
        width="50%"
        icon="₽"
      />

      <p className={styles.text}>
        Данные о клиенте{' '}
        <Tooltip title="При оформлении заказа клиенту нужно будет заполнить эту информацию">
          <span className="center">
            <IoIosHelpCircleOutline />
          </span>
        </Tooltip>
      </p>

      <label className="switch">
        <Switch value={values.name} onChange={checked => setValues({ ...values, name: checked })} />{' '}
        <span>Имя</span>
      </label>
      <label className="switch">
        <Switch value={values.address} onChange={checked => setValues({ ...values, address: checked })} />{' '}
        <span>Город, улица, дом, квартира</span>
      </label>
      <label className="switch">
        <Switch value={values.phone} onChange={checked => setValues({ ...values, phone: checked })} />{' '}
        <span>Телефон</span>
      </label>
      <label className="switch">
        <Switch value={values.comment} onChange={checked => setValues({ ...values, comment: checked })} />{' '}
        <span>Комментарий</span>
      </label>

      <div className="line"></div>
      <SubmitButton>Добавить способ</SubmitButton>
    </form>
  )
}
