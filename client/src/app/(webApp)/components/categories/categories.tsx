import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ICategory } from '@/src/types/category.interface'

import 'swiper/scss'
import styles from './categories.module.scss'

interface Props {
  categories: ICategory[] | undefined
}

export const Categories = ({ categories }: Props) => {
  const [active, setActive] = useState<null | number>(null)

  return (
    <Swiper className={styles.categorySlider} slidesPerView="auto" direction="horizontal">
      <SwiperSlide>
        <div
          onClick={() => setActive(null)}
          className={[styles.category, active === null && styles.active].join(' ')}
        >
          Все
        </div>
      </SwiperSlide>
      {categories?.map((item, index) => {
        return (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => setActive(index)}
              className={[styles.category, active === index && styles.active].join(' ')}
            >
              {item.title}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
