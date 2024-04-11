import React, { ReactNode, useState } from 'react'
import { Modal } from 'antd'
import { createPortal } from 'react-dom'

import './modal.scss'
import { IoWarningOutline } from 'react-icons/io5'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
  title?: string
  children: ReactNode
}

export const ModalUi: React.FC<Props> = ({ open, setOpen, title = '', children }) => {
  const [confirmClose, setConfirmClose] = useState(false)

  const handleCancel = () => {
    setConfirmClose(true)
  }

  const okConfirmModal = () => {
    setConfirmClose(false)
    setOpen(false)
  }

  const undoHideModal = () => {
    setConfirmClose(false)
  }

  return (
    <>
      {createPortal(
        <Modal title={title} open={open} onCancel={handleCancel} footer={[]}>
          {confirmClose && (
            <Modal
              className="confirm"
              title="Выйти из редактирования?"
              open={open}
              onOk={okConfirmModal}
              onCancel={undoHideModal}
              okText="Выйти"
              cancelText="Нет, остаться"
            >
              <div className="confirm__content">
                <IoWarningOutline size={36} /> <p>Внесенные изменения не сохранятся</p>
              </div>
            </Modal>
          )}
          {children}
        </Modal>,
        document.body
      )}
    </>
  )
}
