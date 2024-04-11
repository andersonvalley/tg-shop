import { ReactNode } from 'react'

import cl from './button.module.scss'

interface Props {
  children: ReactNode
  danger?: boolean
  onClick?: () => void
}

export const ButtonMenu = ({ children, danger, onClick }: Props) => {
  return (
    <button onClick={onClick} className={[cl.buttonMenu, danger ? cl.danger : ''].join(' ')} type="button">
      {children}
    </button>
  )
}
