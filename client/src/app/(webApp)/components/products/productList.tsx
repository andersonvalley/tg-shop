import { IGood } from '@/src/types/goods.interface'
import React from 'react'
import { ProductItem } from './productItem'

import styles from './card.module.scss'
import { BsInputCursorText } from 'react-icons/bs'
import { LuSettings2 } from 'react-icons/lu'

interface Props {
  products: IGood[] | undefined
}

export const ProductList = ({ products }: Props) => {
  return (
    <div>
      <div className={styles.head}>
        <h3 className={styles.title}>Все товары</h3>
        <button className={styles.btn}>
          <LuSettings2 size={23} />
        </button>
      </div>
      <ul className={styles.list}>
        {products?.map(item => {
          return <ProductItem key={item.id} {...item} />
        })}
      </ul>
    </div>
  )
}
