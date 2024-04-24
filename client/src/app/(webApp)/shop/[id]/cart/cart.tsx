'use client'

import React, { useState } from 'react'

import styles from './cart.module.scss'
import { MdOutlineDelete } from 'react-icons/md'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { CartItem } from './cartItem'
import { BackButton, MainButton } from '@vkruglikov/react-telegram-web-app'
import { useRouter } from 'next/navigation'

export const Cart = () => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)

  const validatePromocodHandler = () => {}

  return (
    <div className={styles.cart}>
      <BackButton onClick={() => router.back()} />
      <div className={styles.header}>
        <span onClick={validatePromocodHandler} className={styles.title}>
          Корзина
        </span>
        <button className={styles.btn}>
          <MdOutlineDelete size={19} />
        </button>
      </div>

      <div className={styles.content}>
        <ul className={styles.list}>
          <CartItem />
        </ul>

        <button className={styles.code} onClick={() => setOpenModal(true)}>
          У меня есть промокод
        </button>

        {openModal && (
          <ModalUi confirmCloseMessage={false} open={openModal} setOpen={() => setOpenModal(false)}>
            <form></form>
          </ModalUi>
        )}

        <MainButton text="Все верно, далее" onClick={() => console.log('Hello, I am button!')} />
      </div>
    </div>
  )
}
