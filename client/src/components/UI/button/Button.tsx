import React from 'react'
import cl from './button.module.scss'
import { IButton } from './Button.interface'

export const Button: React.FC<IButton> = ({ type, children, className, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={[cl.button, className].join(' ')}>
      {children}
    </button>
  )
}
