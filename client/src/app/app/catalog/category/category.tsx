import { IoMdMore } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'

import React, { memo, useEffect } from 'react'
import { List } from 'react-movable'

import cl from '../catalog.module.scss'
import { useCategoryUiStore } from '../../../../store/useCategoryUi'
import { ContentDropdown } from './contentDropdown'
import { ICategory } from '@/src/types/category.interface'
import { DropdownUi } from '@/src/components/UI/dropdown/dropdown'

interface Props {
  categories: ICategory[] | undefined
  activeCategory: number
  onClick: (index: number) => void
  changeCategory: (oldIndex: number, newIndex: number) => void
}

function sorting(c: ICategory[] | undefined) {
  if (!c) return []
  return c.sort((a, b) => a.order - b.order)
}

const Category: React.FC<Props> = ({ categories, onClick, activeCategory, changeCategory }) => {
  const { setToogleDropdown, openDropdown, currentCategoryId } = useCategoryUiStore()

  return (
    <List
      values={categories ? sorting(categories) : []}
      onChange={({ oldIndex, newIndex }) => changeCategory(oldIndex, newIndex)}
      renderList={({ children, props }) => (
        <ul {...props} className={cl.cardList}>
          {children}
        </ul>
      )}
      renderItem={({ value, props, index }) => (
        <li
          {...props}
          key={value.id}
          style={{
            ...props.style,
          }}
          className={activeCategory === index ? ['card__item', cl.active].join(' ') : 'card__item'}
          onClick={() => onClick(index ? index : 0)}
        >
          <div className={cl.wrapperItem}>
            <button className={cl.drag} data-movable-handle tabIndex={-1}>
              <MdDragIndicator />
            </button>
            <span>{value.title}</span>
            <button onClick={() => setToogleDropdown(value.id, value.title, value.order)} className={cl.more}>
              <IoMdMore />
            </button>
            {openDropdown && currentCategoryId === value.id ? (
              <DropdownUi closeDropdowm={() => setToogleDropdown(value.id, value.title, value.order)}>
                <ContentDropdown value={value} />
              </DropdownUi>
            ) : null}
          </div>
        </li>
      )}
    />
  )
}

export default memo(Category)
