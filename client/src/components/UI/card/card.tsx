'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
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
  additionally?: ReactNode
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
  additionally,
}: Props) => {
  const dangerCl = danger ? styles.danger : ''
  const { openModal, setToogleModal } = useModalStore(store => store)

  return (
    <div style={{ maxWidth: width }} className={[styles.card, dangerCl, 'card', 'animate'].join(' ')}>
      {showHeader && (
        <div className={styles.cardHeader}>
          <motion.span
            initial={{ transform: 'translateY(10px)', opacity: 0 }}
            whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.span>
          {additionally && <div className={styles.additionally}>{additionally}</div>}
          {hideButton ? null : (
            <motion.button
              initial={{ transform: 'translateY(10px) scale(1.2)', opacity: 0 }}
              whileInView={{ transform: 'translateY(0px) scale(1)', opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setToogleModal()}
              className={textButton ? [styles.button, styles.buttonText].join(' ') : styles.button}
            >
              <HiPlus size={23} /> <span>{textButton}</span>
            </motion.button>
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
