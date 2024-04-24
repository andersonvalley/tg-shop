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
import { useMutation } from '@tanstack/react-query'
import { createICart } from '@/src/types/cart.interface'
import { CartService } from '@/src/services/cart/cart.service'
import { useInitData } from '@vkruglikov/react-telegram-web-app'

interface Props extends IGood {
  isLoading: boolean
}

export const ProductItem = ({ title, price, id, photoLinks, isLoading, quantity }: Props) => {
  const { initialPathname, hash } = usePathname()
  const [initDataUnsafe] = useInitData()

  const { mutate: add } = useMutation({
    mutationFn: (formData: createICart) => CartService.create(formData),
  })

  const addToCartHandler = (id: string) => {
    if (!initDataUnsafe?.user?.id) return

    const formData: createICart = {
      subscriber: String(initDataUnsafe?.user?.id),
      goods: id,
    }
    add(formData)
  }

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
                  photoLinks[0]?.link
                    ? process.env.NEXT_PUBLIC_PROD + `/products/${photoLinks[0]?.link}`
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
                <button onClick={() => addToCartHandler(id)} className={styles.add}>
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
