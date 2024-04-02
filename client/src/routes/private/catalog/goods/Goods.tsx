import { IoMdMore } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'

import React from 'react'
import { List } from 'react-movable'
import { IGood } from '../../../../service/goods/goods.interface'

import cl from '../catalog.module.scss'

interface Props {
  goods: IGood[] | undefined
  activeGoods: number
  onClick: (index: number) => void
  changeGoods: (oldIndex: number, newIndex: number) => void
}

export const Goods: React.FC<Props> = ({ goods, onClick, activeGoods, changeGoods }) => {
  return (
    <List
      values={goods ? goods : []}
      onChange={({ oldIndex, newIndex }) => changeGoods(oldIndex, newIndex)}
      renderList={({ children, props }) => (
        <ul {...props} className={cl.cardList}>
          {children}
        </ul>
      )}
      renderItem={({ value, props, index }) => (
        <li
          style={{
            ...props.style,
          }}
          className={activeGoods === index ? [cl.cardItem, cl.active].join(' ') : cl.cardItem}
          {...props}
          onClick={() => onClick(index ? index : 0)}
        >
          <button className={cl.drag} data-movable-handle tabIndex={-1}>
            <MdDragIndicator />
          </button>{' '}
          <span>{value.title}</span>{' '}
          <button className={cl.more}>
            <IoMdMore />
          </button>
        </li>
      )}
    />
  )
}
