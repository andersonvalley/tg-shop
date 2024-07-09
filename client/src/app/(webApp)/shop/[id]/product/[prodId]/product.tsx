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
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Checkbox, Select } from 'antd'
import { useEffect, useState } from 'react'
import { replaceBr } from '@/src/utils'

export const Product = ({ id }: { id: string }) => {
  const router = useRouter()
  const { data } = useGet(QUERY_KEY.getGoodsById, GoodsService.getById, id)
  const [totalAdded, setTotalAdded] = useState(1)
  const [totalPriceByOneItem, setTotalPriceByOneItem] = useState(data?.price ? data?.price : 0)

  const decrease = () => {
    if (totalAdded === 1) return
    setTotalAdded(prev => prev - 1)
  }

  const increment = () => {
    if (data?.quantity && totalAdded === +data?.quantity) return
    setTotalAdded(prev => prev + 1)
  }

  useEffect(() => {
    setTotalPriceByOneItem(prev => (data?.price ? +data?.price * totalAdded : 0))
  }, [totalAdded, data?.price])

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
        <p className={styles.description}>{replaceBr(data?.description)}</p>

        {data?.variants && data.titleVariant && (
          <label className={styles.selectLabel}>
            <span className={styles.labelText}>{data?.titleVariant}</span>
            <Select
              popupClassName={styles.popup}
              className={styles.select}
              defaultValue={data?.variants ? data?.variants[0].title : ''}
              options={
                data?.variants ? data?.variants.map(item => ({ label: item.title, value: item.title })) : []
              }
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
                    <Checkbox
                      className={styles.checkbox}
                      // checked={optionsValues.requiredOption}
                      onChange={() => {}}
                    />
                    <span className={styles.optionTitle}>{item.title}</span>+{normalizePrice(+item.price)}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {data?.weight && <span className={styles.weight}>Вес: {data?.weight} г.</span>}
        <span className={styles.quantity}>
          В наличии: {data?.quantity === '' ? 'много' : data?.quantity + ' шт.'}
        </span>
        <div className={styles.option}></div>
        {normalizePrice(data?.price)}
      </div>

      <div className={styles.actions}>
        <div className={styles.price}>{normalizePrice(totalPriceByOneItem)}</div>
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
        <div className={styles.add}>Добавить</div>
      </div>
    </motion.div>
  )
}
