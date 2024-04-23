'use client'

import React from 'react'
import { IGood } from '@/src/types/goods.interface'
import Link from 'next/link'
import Image from 'next/image'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { useLocation } from '../../hooks/useLocation'

import styles from './card.module.scss'

export const ProductItem = ({ title, price, id, photoLinks }: IGood) => {
  const { hash, currentPath } = useLocation()

  return (
    <li className={styles.card}>
      <Link className={styles.cardImg} href={`${currentPath}/product/${id}${hash}`}>
        <Image
          src={
            photoLinks[0]?.photoLink
              ? process.env.NEXT_PUBLIC_PROD
                ? process.env.NEXT_PUBLIC_PROD + `/products/${photoLinks[0]?.photoLink}`
                : 'http://localhost:5501/api/uploads' + `/products/${photoLinks[0]?.photoLink}`
              : '/nophoto.png'
          }
          alt={title}
          width={200}
          height={200}
        />
      </Link>

      <div className={styles.cardFooter}>
        <h4 className={styles.cardTitle}>{title}</h4>

        <div className={styles.group}>
          <span>{normalizePrice(price)}</span>
          <button className={styles.add}>
            <HiOutlinePlusSm size={23} />
          </button>
        </div>
      </div>
    </li>
  )
}
