import { IoMdMore } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'

import React from 'react'
import { List } from 'react-movable'

import cl from '../catalog.module.scss'
import { ICategory } from '../../../../service/category/category.interface'
import { DropdownUi } from '../../../../components/UI/dropdown/Dropdown'
import { useCategoryUiStore } from '../../../../store/useCategoryUi'
import { ContentDropdown } from './ContentDropdown'

interface Props {
  categories: ICategory[] | undefined
  activeCategory: number
  onClick: (index: number) => void
  changeCategory: (oldIndex: number, newIndex: number) => void
}

function sorting(c: ICategory[]) {
  return c.sort((a, b) => a.order - b.order)
}

export const Category: React.FC<Props> = ({ categories, onClick, activeCategory, changeCategory }) => {
  const { setToogleDropdown, openDropdown, currentCategoryId } = useCategoryUiStore()

  return (
    <>
      <List
        values={categories ? sorting(categories) : []}
        onChange={({ oldIndex, newIndex }) => changeCategory(oldIndex, newIndex)}
        renderList={({ children, props }) => (
          <ul {...props} className={cl.cardList}>
            {children}
          </ul>
        )}
        renderItem={({ value, props, index }) => {
          return (
            <li
              style={{
                ...props.style,
              }}
              className={activeCategory === index ? ['card__item', cl.active].join(' ') : 'card__item'}
              {...props}
              onClick={() => onClick(index ? index : 0)}
            >
              <button className={cl.drag} data-movable-handle tabIndex={-1}>
                <MdDragIndicator />
              </button>{' '}
              <span>{value.title}</span>{' '}
              <button
                onClick={() => setToogleDropdown(value.id, value.title, value.order)}
                className={cl.more}
              >
                <IoMdMore />
              </button>
              {openDropdown && currentCategoryId === value.id ? (
                <DropdownUi closeDropdowm={() => setToogleDropdown(value.id, value.title, value.order)}>
                  <ContentDropdown value={value} />
                </DropdownUi>
              ) : null}
            </li>
          )
        }}
      />
    </>
  )
}
