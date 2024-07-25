'use client'

import { QUERY_KEY } from '@/src/constants/queryKey'
import { useGet } from '@/src/hooks/requests/useGet'
import { GoodsService } from '@/src/services/goods/goods.service'
import { Swiper, SwiperSlide } from 'swiper/react'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackButton, useHapticFeedback, useInitData } from '@vkruglikov/react-telegram-web-app'

import 'swiper/scss'
import styles from './product.module.scss'

import { Checkbox, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { replaceBr } from '@/src/utils'
import { ProductActions } from './product-actions'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { IVariant } from '@/src/types/goods.interface'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createICart } from '@/src/types/cart.interface'
import { CartService } from '@/src/services/cart/cart.service'
import { useCart } from '@/src/app/(webApp)/store/useCart'

export const Product = ({ id }: { id: string }) => {
  const router = useRouter()
  const { data, isSuccess } = useGet(QUERY_KEY.getGoodsById, GoodsService.getById, id)

  const [choosedVariant, setChoosedVariant] = useState(0)
  const [choosedVariantOfProduct, setChoosedVariantOfProduct] = useState<IVariant>()
  const [choosedOptions, setChoosedOptions] = useState<number[]>([0])
  const [totalAdded, setTotalAdded] = useState(1)
  const [totalPriceByOneItem, setTotalPriceByOneItem] = useState(0)
  const [addedProductToCart, setAddedProductToCart] = useState(false)

  const { cart } = useCart()

  const decrease = () => {
    if (totalAdded === 1) return
    setTotalAdded(prev => prev - 1)
  }

  const increment = () => {
    if (choosedVariantOfProduct && +choosedVariantOfProduct?.quantity === +totalAdded) return

    if (data?.quantity && totalAdded === +data?.quantity && !choosedVariantOfProduct) return
    setTotalAdded(prev => prev + 1)
  }

  const changeVariant = (value: string) => {
    const variant = data?.variants.find(item => item.title === value)
    if (!variant) return
    setTotalPriceByOneItem(+variant?.price)
    setChoosedVariant(+variant?.price)

    setChoosedVariantOfProduct(variant)
    setTotalAdded(1)
  }

  const changeOption = (e: CheckboxChangeEvent) => {
    if (choosedOptions.includes(+e.target.value)) {
      setChoosedOptions(prev => prev.filter(item => item !== +e.target.value))
    } else {
      setChoosedOptions(prev => [...prev, +e.target.value])
    }
  }

  const [initDataUnsafe] = useInitData()
  const client = useQueryClient()
  const [impactOccurred, notificationOccurred] = useHapticFeedback()

  const { mutate: add } = useMutation({
    mutationFn: (formData: createICart) => CartService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getCart, initDataUnsafe?.user?.id] })
      message.success('Товар добавлен в корзину')
      notificationOccurred('success')
      router.back()
    },
    onError: () => {
      message.error('Товар уже добавлен в корзину')
      impactOccurred('heavy')
    },
  })

  const addToCartHandler = (id: string) => {
    if (!initDataUnsafe?.user?.id) return

    const options = data?.options
      .filter(item => choosedOptions.includes(+item.price))
      .map(item => item.id)
      .join(',')

    const formData: createICart = {
      subscriber: String(initDataUnsafe?.user?.id),
      goods: id,
      variant: choosedVariantOfProduct?.id ?? '',
      options: options ?? '',
      quantity_cart: totalAdded,
    }

    add(formData)
  }

  useEffect(() => {
    if (data?.variants && data.titleVariant && isSuccess) {
      const price = Math.min(...data.variants.map(item => +item.price))

      setTotalPriceByOneItem(price)
      setChoosedVariant(price)

      const variant = data.variants.find(item => +item.price === price)
      setChoosedVariantOfProduct(variant)
    } else {
      setTotalPriceByOneItem(data?.price ? data?.price : 0)
      setChoosedVariant(data?.price ? data?.price : 0)
    }
  }, [data?.price, data?.titleVariant, data?.variants, isSuccess])

  // count total price
  useEffect(() => {
    setTotalPriceByOneItem(() => choosedVariant * totalAdded)
  }, [totalAdded, choosedVariant, choosedOptions])

  useEffect(() => {
    cart.find(item => {
      if (item.goods_id === data?.id) {
        if (item.variant_id) {
          const variant = item.variant_id === choosedVariantOfProduct?.id

          if (variant) {
            setAddedProductToCart(true)
          } else {
            setAddedProductToCart(false)
          }
        } else {
          return true
        }
      }
    })
  }, [cart, choosedVariantOfProduct?.id, data?.id])

  return (
    <div className={styles.product}>
      {data ? (
        <motion.div
          initial={{ scale: 0, transform: 'translateY(100px)' }}
          animate={{ scale: 1, transform: 'translateY(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 70,
          }}
        >
          <BackButton onClick={() => router.back()} />
          <Swiper slidesPerView={1} spaceBetween={10} direction="horizontal">
            {data &&
              data.photoLinks?.map(item => {
                return (
                  <SwiperSlide className={styles.slide} key={item.id}>
                    <div className={styles.wrapper}>
                      <Image
                        className={styles.img}
                        src={
                          item.link ? process.env.NEXT_PUBLIC_PROD + `/products/${item.link}` : '/nophoto.png'
                        }
                        width={360}
                        height={360}
                        alt={item.id}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            <div className={styles.discount}>
              <div className={styles.badgesLeft}></div>
              <div className={styles.badgesRight}></div>
              {data.discount}%
            </div>
          </Swiper>
          <motion.div
            initial={{ scale: 0, transform: 'translateY(100px)' }}
            animate={{ scale: 1, transform: 'translateY(0px)' }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 90,
            }}
            className={styles.content}
          >
            <h1 className={styles.prductTitle}>{data?.title}</h1>
            <p className={styles.description}>{replaceBr(data?.description)}</p>
            {data?.variants && data.titleVariant && choosedVariant && (
              <label className={styles.selectLabel}>
                <span className={styles.labelText}>{data?.titleVariant}</span>
                <Select
                  popupClassName={styles.popup}
                  className={styles.select}
                  defaultValue={
                    data.variants ? data.variants.find(item => +item.price === choosedVariant)?.title : ''
                  }
                  options={data?.variants.map(item => ({ label: item.title, value: item.title }))}
                  onChange={changeVariant}
                />
              </label>
            )}

            {data?.options && data.titleOption && (
              <div className={styles.options}>
                <span className={styles.labelText}>{data?.titleOption}</span>
                <ul className={styles.optionList}>
                  {data.options.map(item => {
                    return (
                      <li className={styles.optionItem} key={item.id}>
                        <Checkbox value={item.price} className={styles.checkbox} onChange={changeOption}>
                          <span className={styles.optionTitle}>{item.title}</span>
                        </Checkbox>
                        +{normalizePrice(+item.price)}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {data?.weight && (
              <span className={styles.weight}>
                Вес: {choosedVariantOfProduct?.weight ? choosedVariantOfProduct.weight : data?.weight} г.
              </span>
            )}
            {data?.quantity && (
              <span className={styles.quantity}>
                В наличии:{' '}
                {choosedVariantOfProduct?.quantity
                  ? choosedVariantOfProduct.quantity === ''
                    ? 'много'
                    : choosedVariantOfProduct.quantity + ' шт.'
                  : data?.quantity === ''
                  ? 'много'
                  : data?.quantity + ' шт.'}
              </span>
            )}
          </motion.div>

          {data && (
            <ProductActions
              discount={data.discount}
              totalAdded={totalAdded}
              totalPriceByOneItem={totalPriceByOneItem}
              optionsTotal={choosedOptions.reduce((acc, item) => acc + item)}
              decrease={decrease}
              increment={increment}
              addToCartHandler={() => addToCartHandler(data.id)}
              addedProductToCart={addedProductToCart}
            />
          )}
        </motion.div>
      ) : (
        <SpinUi />
      )}
    </div>
  )
}
