import React, { ReactNode } from 'react'
import { Modal } from 'antd'
import { createPortal } from 'react-dom'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
  title: string
  children: ReactNode
  setValue: (type: string) => void
}

export const ModalUi: React.FC<Props> = ({ open, setOpen, title, children, setValue }) => {
  const handleCancel = () => {
    setOpen(false)
    setValue('')
  }

  return (
    <>
      {createPortal(
        <Modal title={title} open={open} onCancel={handleCancel} footer={[]}>
          {children}
        </Modal>,
        document.body
      )}
    </>
  )
}
