import React, { useEffect, useRef, useState } from 'react'

import styles from './products.module.scss'
import { ICategory } from '@/src/types/category.interface'
import Link from 'next/link'
import { PATHS } from '@/src/constants/pages-url.config'

interface Props {
  currentCategory: string
  categories: ICategory[] | undefined
  setCurrentCategory: (type: string) => void
  setCurrentCategoryId: (type: string) => void
}

export const CategorySelect = ({
  currentCategory,
  categories,
  setCurrentCategory,
  setCurrentCategoryId,
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const chooseCurrentCategory = (title: string, id: string) => {
    setCurrentCategory(title)
    setCurrentCategoryId(id)
    setOpenSelect(false)
  }

  useEffect(() => {
    if (!categories) return

    if (categories?.length > 0) {
      setCurrentCategory(categories[0].title)
    }
  }, [categories, setCurrentCategory])

  return (
    <div className={styles.categoryWrapper}>
      <div onClick={() => setOpenSelect(true)} className={styles.categorySelect}>
        {categories?.length === 0 ? (
          <Link href={PATHS.CATALOG} scroll={false}>
            {currentCategory}
          </Link>
        ) : (
          currentCategory
        )}
      </div>

      {openSelect && (
        <div className={styles.hiddenCategory} ref={selectRef}>
          <ul>
            {categories &&
              categories.map(item => (
                <li onClick={() => chooseCurrentCategory(item.title, item.id)} key={item.id}>
                  {item.title}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
