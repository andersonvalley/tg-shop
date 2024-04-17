'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: string
  width?: string
  danger?: boolean
  hideButton?: boolean
  textButton?: string
  modalContent?: ReactNode
  titleModal?: string
  confirmCloseMessage?: boolean
  showHeader?: boolean
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
  confirmCloseMessage,
  showHeader = true,
}: Props) => {
  const dangerCl = danger ? styles.danger : ''
  const { openModal, setToogleModal } = useModalStore(store => store)

  return (
    <div style={{ maxWidth: width }} className={[styles.card, dangerCl, 'card', 'animate'].join(' ')}>
      {showHeader && (
        <div className={styles.cardHeader}>
          <span>{title}</span>{' '}
          {hideButton ? null : (
            <button
              onClick={() => setToogleModal()}
              className={textButton ? [styles.button, styles.buttonText].join(' ') : styles.button}
            >
              <HiPlus size={23} /> <span>{textButton}</span>
            </button>
          )}
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>

      {openModal &&
        createPortal(
          <ModalUi
            title={titleModal}
            open={openModal}
            setOpen={setToogleModal}
            confirmCloseMessage={confirmCloseMessage}
          >
            {modalContent}
          </ModalUi>,
          document?.body
        )}
    </div>
  )
}
