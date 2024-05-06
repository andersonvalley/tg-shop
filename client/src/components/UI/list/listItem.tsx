import React, { ReactNode, memo, useEffect, useState } from 'react'

import styles from './listItem.module.scss'
import { MdDragIndicator, MdOutlineDelete } from 'react-icons/md'
import { IoMdMore } from 'react-icons/io'
import { DropdownUi } from '../dropdown/dropdown'
import { ButtonMenu } from '../button/buttonMenu'
import { RxCursorText } from 'react-icons/rx'
import { useModalStore } from '@/src/store/modal.store'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  editHandler: () => void
  deleteHandler: () => void
  index: number
  editText?: string
}

export const ListItem = ({
  children,
  deleteHandler,
  editHandler,
  index,
  editText = 'Переименовать',
}: Props) => {
  const { isOpenDropdown, setIsOpenDropdown, currentClickIndex, setCurrentClickIndex } = useModalStore(
    store => store
  )
  const pathname = usePathname()

  const clickHandler = (index: number) => {
    setCurrentClickIndex(index)
    setIsOpenDropdown()
  }

  useEffect(() => setCurrentClickIndex(-1), [pathname, setCurrentClickIndex])

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={styles.item}
    >
      <div className={styles.wrapperItem}>
        {/* <button className={styles.drag}>
          <MdDragIndicator size={19} />
        </button> */}
        <div className={styles.content}>{children}</div>
        <button onClick={() => clickHandler(index)} className={styles.more}>
          <IoMdMore size={21} />
        </button>

        {isOpenDropdown && currentClickIndex === index && (
          <DropdownUi closeDropdowm={() => setIsOpenDropdown()}>
            <ul className={styles.group}>
              <li>
                <ButtonMenu onClick={editHandler}>
                  <RxCursorText size={19} /> {editText}
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
    </motion.li>
  )
}
