'use client'

import React, { useState } from 'react'
import { BackButton, MainButton } from '@vkruglikov/react-telegram-web-app'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import styles from '../cart.module.scss'
import { Input } from '@/src/components/UI/input/input'
import { useGetDeliveryCart } from './fetch/useGetDelivery'
import { Select } from 'antd'
import { useGetPaymentCart } from './fetch/useGetPayment'

export const Delivery = () => {
  const router = useRouter()
  const { id } = useParams()

  const [inputValues, setInputValues] = useState({
    comments: '',
    phone: '',
  })

  const { delivery } = useGetDeliveryCart(String(id))
  const { payment } = useGetPaymentCart(String(id))

  const makeOrderHandler = () => {}

  return (
    <motion.div
      initial={{ scale: 0, transform: 'translateY(100px)' }}
      animate={{ scale: 1, transform: 'translateY(0px)' }}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 30,
      }}
      className={styles.delivery}
    >
      <BackButton onClick={() => router.back()} />

      <h3 className={[styles.title, styles.titleSmall].join(' ')}>Способ доставки</h3>
      <Select
        popupClassName={styles.popup}
        className={styles.select}
        defaultValue={delivery && delivery[0].title}
        options={delivery?.map(item => ({ label: item.title, value: item.title }))}
        // onChange={changeVariant}
      />

      <h3 className={[styles.title, styles.titleSmall].join(' ')}>Способ оплаты</h3>
      <Select
        popupClassName={styles.popup}
        className={styles.select}
        defaultValue={payment && payment[0].title}
        options={payment?.map(item => ({ label: item.title, value: item.title }))}
        // onChange={changeVariant}
      />

      <h3 className={[styles.title, styles.titleSmall].join(' ')}>Получатель</h3>
      <form>
        <Input
          className={styles.input}
          type="tel"
          label="Телефон"
          value={inputValues.phone}
          onChange={e => setInputValues({ ...inputValues, phone: e.target.value })}
          placeholder="Телефон"
        />
        <Input
          className={styles.input}
          type="tel"
          label="Комментарий"
          required={false}
          value={inputValues.comments}
          onChange={e => setInputValues({ ...inputValues, comments: e.target.value })}
          placeholder="Комментарий"
        />
      </form>

      {inputValues.phone.length > 0 && <MainButton text="Оформить заказ" onClick={makeOrderHandler} />}
    </motion.div>
  )
}
