import { ReactNode, useEffect, useState } from 'react'

import cl from './alert.module.scss'
import { MdClose } from 'react-icons/md'

interface Props {
  children: ReactNode
  local: string
}

export const Alert = ({ children, local }: Props) => {
  const [show, setShow] = useState(true)

  const closeAlert = () => {
    setShow(false)
    window.localStorage.setItem(local, 'false')
  }

  useEffect(() => {
    const isExists = window.localStorage.getItem(local)
    if (isExists) {
      setShow(false)
    }
  }, [local])

  return (
    <>
      {show && (
        <div className={cl.alert}>
          <div className={cl.text}>{children}</div>

          <button onClick={closeAlert}>
            <MdClose size={21} />
          </button>
        </div>
      )}
    </>
  )
}
