'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineDelete } from 'react-icons/md'
import { CartItem } from './cartItem'
import { BackButton, MainButton, useInitData } from '@vkruglikov/react-telegram-web-app'
import { useParams, useRouter } from 'next/navigation'
import { useGetCart } from '../../../hooks/useGetCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CartService } from '@/src/services/cart/cart.service'
import { QUERY_KEY } from '@/src/constants/queryKey'
import Image from 'next/image'

import styles from './cart.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { updateICart } from '@/src/types/cart.interface'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { Input } from '@/src/components/UI/input/input'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import Modal from 'antd/es/modal/Modal'
import { useValidatePromocode } from './fetch/validatePromocode'
import { usePathname } from '../../../hooks/usePath'

export const Cart = () => {
  const router = useRouter()
  const { id } = useParams()
  const client = useQueryClient()

  const [price, setPrice] = useState(0)

  const { hash, initialPathname } = usePathname()
  const [initDataUnsafe] = useInitData()
  const { cart } = useGetCart()

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [openModalPromocode, setOpenModalPromocode] = useState(false)
  const [promocodeModalValue, setPromocodeModalValue] = useState('')

  const { validate } = useValidatePromocode()

  const { mutate: deleteAll } = useMutation({
    mutationFn: () => CartService.deleteAll(String(initDataUnsafe?.user?.id)),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getCart, initDataUnsafe?.user?.id] }),
  })

  const { mutate: update } = useMutation({
    mutationFn: (data: updateICart) => CartService.update(data),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getCart, initDataUnsafe?.user?.id] }),
  })

  const countedTotalPrice = useMemo(() => {
    let sum = 0

    function totalOptions() {
      let totalPrice = 0

      cart?.forEach(item => {
        if (item.options_id) {
          const optionIds = item.options_id.split(',')

          optionIds.forEach(optionId => {
            const option = item.options.find(opt => opt.id === optionId)

            if (option) {
              totalPrice += +option.price
            }
          })
        }
      })
      return totalPrice
    }

    cart?.map(item => {
      if (item.variant_id) {
        const variant = item.variants.find(variant => variant.id === item.variant_id)

        if (!variant) return

        sum = sum + ((+variant.price * item.quantity_cart) / 100) * (100 - item.discount)
        return sum
      } else {
        sum = sum + ((+item.price * item.quantity_cart) / 100) * (100 - item.discount)
        return sum
      }
    })

    sum += +totalOptions()

    setPrice(sum)
    return normalizePrice(sum)
  }, [cart])

  useEffect(() => {
    let total = 0

    cart?.forEach(item => {
      if (item.variants && item.variants.length > 0 && item.variant_id) {
        const selectedVariant = item.variants.find(variant => variant.id === item.variant_id)
        if (selectedVariant) {
          total += item.quantity_cart
        }
      } else {
        total += item.quantity_cart || 0
      }
    })

    setTotalQuantity(total)
  }, [cart])

  const increment = (id: string) => {
    const item = cart?.find(item => item.id === id)

    if (!item) return

    if (item.variant_id) {
      const variant = item.variants.find(variant => variant.id === item.variant_id)

      if (!variant) return

      if (+variant?.quantity === +item.quantity_cart) return
    } else {
      if (+item.quantity === +item.quantity_cart) return
    }

    update({ id: item.id, quantity_cart: item.quantity_cart + 1 })
  }
  const decrease = (id: string) => {
    const item = cart?.find(item => item.id === id)

    if (!item) return

    update({ id: item.id, quantity_cart: item.quantity_cart - 1 })
  }
  const validatePromocodeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validate({
      promocode: promocodeModalValue,
      shopId: String(id),
      subscriberId: String(initDataUnsafe?.user?.id),
      sum: price,
    })
  }

  const navigateToNextPage = () => {
    router.push(`${initialPathname}/cart/delivery${hash}`)
  }

  return (
    <div className={styles.cart}>
      {cart ? (
        <>
          <BackButton onClick={() => router.back()} />
          <div className={styles.header}>
            <motion.span
              initial={{ scale: 0, transform: 'translateY(100px)' }}
              animate={{ scale: 1, transform: 'translateY(0px)' }}
              transition={{
                type: 'spring',
                stiffness: 160,
                damping: 30,
              }}
              onClick={() => setOpenModalPromocode(true)}
              className={styles.title}
            >
              Корзина
            </motion.span>
            {cart && cart.length > 0 && (
              <motion.button
                initial={{ scale: 0, transform: 'translateY(100px)' }}
                animate={{ scale: 1, transform: 'translateY(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 30,
                }}
                onClick={() => deleteAll()}
                className={styles.btn}
              >
                <MdOutlineDelete size={19} />
              </motion.button>
            )}
          </div>

          <div className={styles.content}>
            <ul className={styles.list}>
              {cart?.length === 0 && (
                <motion.li
                  initial={{ scale: 0, transform: 'translateY(100px)' }}
                  animate={{ scale: 1, transform: 'translateY(0px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 70,
                  }}
                  className={styles.emptyCart}
                >
                  <Image
                    className="animate cart"
                    src={'/empty-cart.png'}
                    width={100}
                    height={100}
                    alt="empty"
                  />
                  <h2>Корзина пустая 😕</h2>
                  <p>Для того, чтобы сделать заказ, вернитесь на главную страницу.</p>
                </motion.li>
              )}
              {cart?.map(item => {
                return (
                  <CartItem
                    key={item.id + item.variant_id}
                    {...item}
                    increment={increment}
                    decrease={decrease}
                  />
                )
              })}
            </ul>

            {cart && cart.length > 0 && (
              <button className={styles.code} onClick={() => setOpenModalPromocode(true)}>
                У меня есть промокод
              </button>
            )}

            {cart && cart.length > 0 && (
              <motion.div
                initial={{ scale: 0, transform: 'translateY(100px)' }}
                animate={{ scale: 1, transform: 'translateY(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 360,
                  damping: 70,
                }}
                className={styles.total}
              >
                <p className={styles.countText}>
                  Всего товаров: <span>{totalQuantity} шт.</span>
                </p>
                <p className={styles.price}>
                  Сумма заказа: <span>{countedTotalPrice}</span>
                </p>
              </motion.div>
            )}

            {openModalPromocode && (
              <Modal
                className="modal"
                footer={false}
                open={openModalPromocode}
                onCancel={() => setOpenModalPromocode(false)}
              >
                <form onSubmit={validatePromocodeHandler}>
                  <Input
                    className={styles.input}
                    label="Введите промокод"
                    value={promocodeModalValue}
                    onChange={e => setPromocodeModalValue(e.target.value)}
                    placeholder="SALE10"
                  />
                  <SubmitButton className={styles.submit}>Применить</SubmitButton>
                </form>
              </Modal>
            )}

            {cart && cart?.length > 0 && <MainButton text="Все верно, далее" onClick={navigateToNextPage} />}
          </div>
        </>
      ) : (
        <SpinUi />
      )}
    </div>
  )
}
