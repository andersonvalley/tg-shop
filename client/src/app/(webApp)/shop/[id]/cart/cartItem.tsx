import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './cart.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { iCart } from '@/src/types/cart.interface'
import { IOption, IVariant } from '@/src/types/goods.interface'

interface Props extends iCart {
  decrease: (id: string) => void
  increment: (id: string) => void
}

export const CartItem = ({
  title,
  price,
  photoLinks,
  variants,
  variant_id,
  options,
  options_id,
  quantity_cart,
  id,
  discount,
  decrease,
  increment,
}: Props) => {
  const [currentVariant, setCurrentVariant] = useState<IVariant>()
  const [currentOptions, setCurrentOptions] = useState<IOption[]>([])

  useEffect(() => {
    const variant = variants.find(item => item.id === variant_id)
    setCurrentVariant(variant)
  }, [variant_id, variants])

  useEffect(() => {
    if (!options_id) return

    const optionsArr = options.filter(item => options_id.split(',').includes(item.id))

    setCurrentOptions(optionsArr)
  }, [options_id, options])

  return (
    <motion.li
      initial={{ opacity: 0, transform: 'translateY(100px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0)' }}
      className={styles.item}
    >
      <div className={styles.col}>
        <Image
          className={styles.img}
          src={
            photoLinks[0]?.link
              ? process.env.NEXT_PUBLIC_PROD + `/products/${photoLinks[0]?.link}`
              : '/nophoto.png'
          }
          width={50}
          height={50}
          alt="title"
        />

        <div className={styles.text}>
          <p className={styles.itemTitle}>{title}</p>
          {currentVariant && <p className={styles.variant}>{currentVariant?.title}</p>}
          {currentOptions && (
            <p className={styles.option}>{currentOptions.map(item => item.title).join(', ')}</p>
          )}
          <p className={styles.price}>
            <span className={styles.oldPrice}>
              {normalizePrice(currentVariant ? +currentVariant?.price : price)}{' '}
            </span>
            <span className={styles.newPrice}>
              {normalizePrice(
                currentVariant
                  ? (+currentVariant?.price / 100) * (100 - discount)
                  : (price / 100) * (100 - discount)
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="col">
        <div className={styles.count}>
          <button onClick={() => decrease(id)} className={styles.countItem}>
            <FaMinus />
          </button>
          <span className={styles.countNumber}>{quantity_cart}</span>
          <button onClick={() => increment(id)} className={styles.countItem}>
            <FaPlus />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
