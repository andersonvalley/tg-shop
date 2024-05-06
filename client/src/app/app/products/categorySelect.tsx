import React from 'react'

import styles from './products.module.scss'
import { ICategory } from '@/src/types/category.interface'

interface Props {
  currentCategory: string
  categories: ICategory[] | undefined
}

export const CategorySelect = ({ currentCategory, categories }: Props) => {
  return (
    <div className={styles.categorySelect}>
      {currentCategory}

      <div className={styles.hiddenCategory}>
        <ul>
          <li>Все</li>
          {categories && categories.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
      </div>
    </div>
  )
}
