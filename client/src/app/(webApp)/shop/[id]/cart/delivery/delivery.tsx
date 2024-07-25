'use client'

import React, { useState } from 'react'
import { BackButton, MainButton, useInitData } from '@vkruglikov/react-telegram-web-app'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import styles from '../cart.module.scss'
import { Input } from '@/src/components/UI/input/input'
import { useGetDeliveryCart } from './fetch/useGetDelivery'
import { Select } from 'antd'
import { useGetPaymentCart } from './fetch/useGetPayment'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { useCreateOrder } from './fetch/makeOrder'
import { ICreateOrder } from '@/src/types/order.interface'
import { useCart } from '@/src/app/(webApp)/store/useCart'

export const Delivery = () => {
  const router = useRouter()
  const { id: shopId } = useParams()
  const { cart, totalPrice, promocodeId } = useCart()

  const { delivery, isLoading: isLoadingDelivery } = useGetDeliveryCart(String(shopId))
  const { payment, isLoading: isLoadingPayment } = useGetPaymentCart(String(shopId))

  const [inputValues, setInputValues] = useState({
    comment: '',
    phone: '',
    deliveryId: '',
    paymentId: '',
  })

  const { makeOrder } = useCreateOrder()
  const [initDataUnsafe] = useInitData()

  const makeOrderHandler = () => {
    if (inputValues.phone === '') return

    const data: ICreateOrder = {
      shopId: String(shopId),
      subscriberId: String(initDataUnsafe?.user?.id),
      paymentId: inputValues.paymentId === '' ? String(payment && payment[0].id) : inputValues.paymentId,
      deliveryId: inputValues.deliveryId === '' ? String(delivery && delivery[0].id) : inputValues.deliveryId,
      promocodeId: promocodeId,
      totalPrice: totalPrice,
      products: JSON.stringify(cart),
      comment: inputValues.comment,
      phone: inputValues.phone,
    }
    makeOrder(data)
  }

  return (
    <div className={styles.delivery}>
      <BackButton onClick={() => router.back()} />

      <motion.div
        initial={{ scale: 0, transform: 'translateY(100px)' }}
        animate={{ scale: 1, transform: 'translateY(0px)' }}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 70,
        }}
      >
        {delivery && (
          <>
            <h3 className={[styles.title, styles.titleSmall].join(' ')}>Способ доставки</h3>
            <Select
              popupClassName={styles.popup}
              className={styles.select}
              defaultValue={delivery && delivery[0].title}
              options={delivery?.map(item => ({ label: item.title, value: item.id }))}
              onChange={(value: string) => setInputValues({ ...inputValues, deliveryId: value })}
            />
          </>
        )}

        {payment && (
          <>
            <h3 className={[styles.title, styles.titleSmall].join(' ')}>Способ оплаты</h3>
            <Select
              popupClassName={styles.popup}
              className={styles.select}
              defaultValue={payment[0].title}
              options={payment?.map(item => ({ label: item.title, value: item.id }))}
              onChange={(value: string) => setInputValues({ ...inputValues, paymentId: value })}
            />
          </>
        )}
      </motion.div>

      {!isLoadingDelivery && !isLoadingPayment ? (
        <motion.div
          initial={{ scale: 0, transform: 'translateY(100px)' }}
          animate={{ scale: 1, transform: 'translateY(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 60,
          }}
        >
          <h3 className={[styles.title, styles.titleSmall].join(' ')}>Получатель</h3>
          <form onSubmit={makeOrderHandler}>
            <Input
              className={styles.input}
              type="tel"
              label="Телефон"
              value={inputValues.phone}
              onChange={e => {
                const value = e.target.value
                const regex = /^[0-9\s+]*$/
                if (regex.test(value)) {
                  setInputValues({ ...inputValues, phone: value })
                }
              }}
              minLength={8}
              maxLength={18}
              placeholder="Телефон"
            />
            <Input
              className={styles.input}
              type="text"
              label="Комментарий"
              required={false}
              value={inputValues.comment}
              onChange={e => setInputValues({ ...inputValues, comment: e.target.value })}
              placeholder="Комментарий"
            />
          </form>
        </motion.div>
      ) : (
        <SpinUi />
      )}

      <button onClick={makeOrderHandler}>ggd</button>
      {inputValues.phone.length > 0 && <MainButton text="Оформить заказ" onClick={makeOrderHandler} />}
    </div>
  )
}
