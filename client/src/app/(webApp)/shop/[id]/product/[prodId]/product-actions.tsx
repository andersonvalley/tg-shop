'use client'

import React, { useEffect, useState } from 'react'

import styles from './product.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

interface Props {
  totalAdded: number
  totalPriceByOneItem: number
  decrease: () => void
  increment: () => void
  discount: number
  optionsTotal: number
  addToCartHandler: () => void
  addedProductToCart: boolean
}

export const ProductActions: React.FC<Props> = ({
  totalAdded,
  totalPriceByOneItem,
  decrease,
  increment,
  discount,
  addToCartHandler,
  optionsTotal,
  addedProductToCart,
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return createPortal(
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={styles.actions}
    >
      <div className={styles.price}>
        <span className={styles.oldPrice}>{normalizePrice(totalPriceByOneItem)}</span>
        <span className={styles.newPrice}>
          {normalizePrice((totalPriceByOneItem / 100) * (100 - discount) + optionsTotal)}
        </span>
      </div>
      <div className="col">
        <div className={styles.count}>
          <button onClick={decrease} className={styles.countItem}>
            <FaMinus />
          </button>
          <span className={styles.countNumber}>{totalAdded}</span>
          <button onClick={increment} className={styles.countItem}>
            <FaPlus />
          </button>
        </div>
      </div>
      <button disabled={addedProductToCart} onClick={addToCartHandler} className={styles.add}>
        {addedProductToCart ? <FaCheck size={20} /> : <FaPlus size={20} />}
      </button>
    </motion.div>,
    document.body
  )
}
