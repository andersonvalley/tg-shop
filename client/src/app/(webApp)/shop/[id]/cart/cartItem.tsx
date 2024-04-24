import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

import styles from './cart.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { iCart } from '@/src/types/cart.interface'

export const CartItem = ({ title, price, photoLinks }: iCart) => {
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
          <p className={styles.variant}>только цветок тесто, 30 см.</p>
          <p className={styles.option}>Бекон 50 гр</p>
          <p className={styles.price}>{normalizePrice(price)}</p>
        </div>
      </div>

      <div className="col">
        <div className={styles.count}>
          <button className={styles.countItem}>
            <FaMinus />
          </button>
          <span className={styles.countNumber}>1</span>
          <button className={styles.countItem}>
            <FaPlus />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
