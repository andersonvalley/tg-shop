import Image from 'next/image'
import React from 'react'

import styles from './cart.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const CartItem = () => {
  return (
    <li className={styles.item}>
      <div className={styles.col}>
        <Image className={styles.img} src="/nophoto.png" width={50} height={50} alt="title" />

        <div className={styles.text}>
          <p className={styles.itemTitle}>Фикус Микрокарпа Гинсенг бонсай</p>
          <p className={styles.variant}>только цветок тесто, 30 см.</p>
          <p className={styles.option}>Бекон 50 гр</p>
          <p className={styles.price}>{normalizePrice(725)}</p>
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
    </li>
  )
}
