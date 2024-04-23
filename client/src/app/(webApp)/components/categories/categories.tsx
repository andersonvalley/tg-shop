import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ICategory } from '@/src/types/category.interface'

import 'swiper/scss'
import styles from './categories.module.scss'
import { useSearchAndSortStore } from '../../store/searchAndSort'
import { motion } from 'framer-motion'

interface Props {
  categories: ICategory[] | undefined
}

export const Categories = ({ categories }: Props) => {
  const { category, setCategory } = useSearchAndSortStore()

  return (
    <Swiper className={styles.categorySlider} slidesPerView="auto" direction="horizontal">
      <SwiperSlide>
        <motion.div
          initial={{ opacity: 0, transform: 'translateX(100px)' }}
          whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
          viewport={{ once: true }}
          onClick={() => setCategory('')}
          className={[styles.category, category === '' && styles.active].join(' ')}
        >
          Все
        </motion.div>
      </SwiperSlide>
      {categories?.map(item => {
        return (
          <SwiperSlide key={item.id}>
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(100px)' }}
              whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }}
              onClick={() => setCategory(item.id)}
              className={[styles.category, category === item.id && styles.active].join(' ')}
            >
              {item.title}
            </motion.div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
