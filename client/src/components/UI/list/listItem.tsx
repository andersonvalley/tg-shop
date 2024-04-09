import React, { ReactNode, useState } from 'react'

import styles from './listItem.module.scss'
import { MdDragIndicator, MdOutlineDelete } from 'react-icons/md'
import { IoMdMore } from 'react-icons/io'
import { DropdownUi } from '../dropdown/dropdown'
import { ButtonMenu } from '../button/buttonMenu'
import { RxCursorText } from 'react-icons/rx'
import { useModalStore } from '@/src/store/modal.store'

interface Props {
  children: ReactNode
  editHandler: () => void
  deleteHandler: () => void
}

export const ListItem = ({ children, deleteHandler, editHandler }: Props) => {
  const { isOpenDropdown, setIsOpenDropdown } = useModalStore(store => store)

  return (
    <li className={styles.item}>
      <div className={styles.wrapperItem}>
        <button className={styles.drag}>
          <MdDragIndicator size={19} />
        </button>
        <div className={styles.content}>{children}</div>
        <button onClick={() => setIsOpenDropdown()} className={styles.more}>
          <IoMdMore size={21} />
        </button>

        {isOpenDropdown && (
          <DropdownUi closeDropdowm={() => setIsOpenDropdown()}>
            <ul className={styles.group}>
              <li>
                <ButtonMenu onClick={editHandler}>
                  <RxCursorText size={19} /> Переименовать
                </ButtonMenu>
              </li>
              <li>
                <ButtonMenu onClick={deleteHandler} danger>
                  <MdOutlineDelete size={19} /> Удалить
                </ButtonMenu>
              </li>
            </ul>
          </DropdownUi>
        )}
      </div>
    </li>
  )
}
