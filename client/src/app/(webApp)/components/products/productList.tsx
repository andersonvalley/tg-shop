import { IGood } from '@/src/types/goods.interface'
import React, { useMemo, useState } from 'react'
import { ProductItem } from './productItem'
import { LuSettings2 } from 'react-icons/lu'
import { sortByItems } from './products.sortBy'
import { useSearchAndSortStore } from '../../store/searchAndSort'
import { ICategory } from '@/src/types/category.interface'
import { DropdownUi } from '@/src/components/UI/dropdown/dropdown'

import styles from './card.module.scss'

interface Props {
  products: IGood[] | undefined
  categories: ICategory[] | undefined
  isLoading: boolean
}

export const ProductList = ({ products, categories, isLoading }: Props) => {
  const { category, setSortBy, setSortByType } = useSearchAndSortStore()
  const [openDropDown, setOpenDropDown] = useState(false)
  const [openDropDownSort, setOpenDropDownSort] = useState(false)
  const [title, setTitle] = useState(sortByItems[0].title)

  const findCategory = useMemo(() => {
    if (products?.length === 0) return 'Товаров нет'
    const cat = categories?.find(item => item.id === category)

    if (!cat) return 'Все товары'
    return cat.title
  }, [categories, category, products])

  const changeSortHandler = (value: string, title: string) => {
    if (!value) {
      setSortBy('')
    } else {
      setSortBy('price')
    }
    setTitle(title)
    setSortByType(value)
    setOpenDropDownSort(false)
    setOpenDropDown(false)
  }

  return (
    <>
      <div className={styles.head}>
        <h3 className={styles.title}>{findCategory}</h3>
        <button onClick={() => setOpenDropDown(true)} className={styles.btn}>
          <LuSettings2 size={23} />
        </button>

        {openDropDown && (
          <DropdownUi className={styles.drop} closeDropdowm={() => setOpenDropDown(false)}>
            Сортировка по:{' '}
            <button>
              <span onClick={() => setOpenDropDownSort(true)}>{title}</span>
              {openDropDownSort && (
                <DropdownUi className={styles.sort} closeDropdowm={() => setOpenDropDown(false)}>
                  <ul>
                    {sortByItems.map(item => {
                      return (
                        <li
                          className={item.title === title ? styles.activeSort : ''}
                          onClick={() => changeSortHandler(item.type, item.title)}
                          key={item.title}
                        >
                          {item.title}
                        </li>
                      )
                    })}
                  </ul>
                </DropdownUi>
              )}
            </button>
          </DropdownUi>
        )}
      </div>
      <ul className={styles.list}>
        {products?.map(item => {
          return <ProductItem isLoading={isLoading} key={item.id} {...item} />
        })}
      </ul>
    </>
  )
}
