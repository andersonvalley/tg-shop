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
    <div className={styles.product}>
      <BackButton onClick={() => router.back()} />
      <Swiper slidesPerView={1} spaceBetween={10} direction="horizontal">
        {data &&
          data.photoLinks?.map(item => {
            return (
              <SwiperSlide className={styles.slide} key={item.id}>
                <motion.div
                  className={styles.wrapper}
                  initial={{ opacity: 0, transform: 'translateY(100px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                  viewport={{ once: true }}
                >
                  <Image
                    className={styles.img}
                    src={
                      item.photoLink
                        ? process.env.NEXT_PUBLIC_PROD
                          ? process.env.NEXT_PUBLIC_PROD + `/products/${item.photoLink}`
                          : 'http://localhost:5501/api/uploads' + `/products/${item.photoLink}`
                        : '/nophoto.png'
                    }
                    width={360}
                    height={360}
                    alt={item.id}
                  />
                </motion.div>
              </SwiperSlide>
            )
          })}
      </Swiper>
      <div className={styles.content}>
        <div className={styles.prductTitle}>
          <h1>{data?.title}</h1>
          <span className={styles.weight}>{data?.weight}</span>
        </div>
        <div className={styles.variant}></div>
        <p className={styles.description}>{data?.description}</p>
        {normalizePrice(data?.price)}
        <div className={styles.option}></div>
      </div>
    </div>
  )
}
