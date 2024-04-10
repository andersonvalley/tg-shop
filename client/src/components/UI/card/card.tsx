'use client'

import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  title: string
  width?: string
  danger?: boolean
  hideButton?: boolean
  textButton?: string
  modalContent?: ReactNode
  titleModal?: string
}

import styles from './card.module.scss'
import { HiPlus } from 'react-icons/hi'
import { createPortal } from 'react-dom'
import { ModalUi } from '../modal/modal'
import { useModalStore } from '@/src/store/modal.store'

export const Card = ({
  children,
  title,
  textButton,
  width,
  hideButton,
  danger,
  modalContent,
  titleModal,
}: Props) => {
  const dangerCl = danger ? styles.danger : ''
  const { openModal, setToogleModal } = useModalStore(store => store)

  return (
    <div style={{ maxWidth: width }} className={[styles.card, dangerCl, 'card', 'animate'].join(' ')}>
      <div className={styles.cardHeader}>
        <span>{title}</span>{' '}
        {hideButton ? null : (
          <button onClick={() => setToogleModal()} className={styles.button}>
            <HiPlus size={23} /> {textButton}
          </button>
        )}
      </div>
      <div className={styles.cardBody}>{children}</div>

      {openModal &&
        createPortal(
          <ModalUi title={titleModal} open={openModal} setOpen={setToogleModal}>
            {modalContent}
          </ModalUi>,
          document.body
        )}
    </div>
  )
}