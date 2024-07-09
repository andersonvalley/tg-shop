'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineDelete } from 'react-icons/md'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { CartItem } from './cartItem'
import { BackButton, MainButton, useInitData } from '@vkruglikov/react-telegram-web-app'
import { useRouter } from 'next/navigation'
import { useGetCart } from '../../../hooks/useGetCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CartService } from '@/src/services/cart/cart.service'
import { QUERY_KEY } from '@/src/constants/queryKey'
import Image from 'next/image'

import styles from './cart.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'

export const Cart = () => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const { cart } = useGetCart()
  const [initDataUnsafe] = useInitData()
  const client = useQueryClient()

  const { mutate: deleteAll } = useMutation({
    mutationFn: () => CartService.deleteAll(String(initDataUnsafe?.user?.id)),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getCart, initDataUnsafe?.user?.id] }),
  })

  const countedTotalPrice = useMemo(() => {
    let sum = 0
    cart?.map(item => {
      sum = sum + +item.price
      return sum
    })

    return normalizePrice(sum)
  }, [cart])

  const validatePromocodeHandler = () => {}

  return (
    <div className={styles.cart}>
      <BackButton onClick={() => router.back()} />
      <div className={styles.header}>
        <span onClick={validatePromocodeHandler} className={styles.title}>
          Корзина
        </span>
        {cart && cart.length > 0 && (
          <button onClick={() => deleteAll()} className={styles.btn}>
            <MdOutlineDelete size={19} />
          </button>
        )}
      </div>

      <div className={styles.content}>
        <ul className={styles.list}>
          {cart?.length === 0 && (
            <motion.li
              initial={{ opacity: 0, transform: 'translateY(100px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true }}
              className={styles.emptyCart}
            >
              <Image className="animate cart" src={'/empty-cart.png'} width={100} height={100} alt="empty" />
              <h2>Корзина пустая 😕</h2>
              <p>Для того, чтобы сделать заказ, вернитесь на главную страницу.</p>
            </motion.li>
          )}
          {cart?.map(item => {
            return <CartItem key={item.id + item.variant_id} {...item} />
          })}
        </ul>

        {cart && cart.length > 0 && (
          <button className={styles.code} onClick={() => setOpenModal(true)}>
            У меня есть промокод
          </button>
        )}

        {cart && cart.length > 0 && (
          <div className={styles.total}>
            <p className={styles.countText}>
              Всего товаров: <span>{cart.length} шт.</span>
            </p>
            <p className={styles.price}>
              Сумма заказа: <span>{countedTotalPrice}</span>
            </p>
          </div>
        )}

        {openModal && (
          <ModalUi confirmCloseMessage={false} open={openModal} setOpen={() => setOpenModal(false)}>
            <form></form>
          </ModalUi>
        )}

        {cart && cart?.length > 0 && (
          <MainButton text="Все верно, далее" onClick={() => console.log('Hello, I am button!')} />
        )}
      </div>
    </div>
  )
}
