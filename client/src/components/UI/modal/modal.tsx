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
  confirmCloseMessage?: boolean
  width?: string
}

export const ModalUi: React.FC<Props> = ({
  open,
  setOpen,
  title = '',
  children,
  confirmCloseMessage = true,
  width,
}) => {
  const [confirmClose, setConfirmClose] = useState(false)

  const handleCancel = () => {
    if (confirmCloseMessage) {
      setConfirmClose(true)
    } else {
      setOpen(false)
    }
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
              width={width}
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
