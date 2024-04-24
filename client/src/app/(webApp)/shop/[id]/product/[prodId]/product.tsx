'use client'

import { QUERY_KEY } from '@/src/constants/queryKey'
import { useGet } from '@/src/hooks/requests/useGet'
import { GoodsService } from '@/src/services/goods/goods.service'
import { Swiper, SwiperSlide } from 'swiper/react'
import { normalizePrice } from '@/src/utils/normalizeCurrency'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

import 'swiper/scss'
import styles from './product.module.scss'

export const Product = ({ id }: { id: string }) => {
  const router = useRouter()
  const { data } = useGet(QUERY_KEY.getGoodsById, GoodsService.getById, id)

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(100px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true }}
      className={styles.product}
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
                    src={item.link ? process.env.NEXT_PUBLIC_PROD + `/products/${item.link}` : '/nophoto.png'}
                    width={360}
                    height={360}
                    alt={item.id}
                  />
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
      <div className={styles.content}>
        <h1 className={styles.prductTitle}>{data?.title}</h1>
        <p className={styles.description}>{data?.description}</p>

        <div className={styles.variant}></div>
        {data?.weight && <span className={styles.weight}>Вес: {data?.weight} г.</span>}
        <span className={styles.quantity}>
          В наличии: {data?.quantity === '' ? 'много' : data?.quantity + 'шт.'}
        </span>
        <div className={styles.option}></div>
        {normalizePrice(data?.price)}
      </div>
    </motion.div>
  )
}
