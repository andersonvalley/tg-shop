'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { IGood } from '@/src/types/goods.interface'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { SpinUi } from '@/src/components/UI/loader/spin'

import styles from './card.module.scss'
import { usePathname } from '../../hooks/usePath'

interface Props extends IGood {
  isLoading: boolean
}

export const ProductItem = ({ title, price, id, photoLinks, isLoading, quantity }: Props) => {
  const { initialPathname, hash } = usePathname()

  if (quantity === '0') return

  return (
    <motion.li
      className={[styles.card, isLoading ? styles.spin : ''].join(' ')}
      initial={{ opacity: 0, transform: 'translateY(100px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0)' }}
      viewport={{ once: true }}
    >
      <div>
        {isLoading ? (
          <SpinUi />
        ) : (
          <>
            <Link className={styles.cardImg} href={`${initialPathname}/product/${id}${hash}`}>
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
          </>
        )}
      </div>
    </motion.li>
  )
}
