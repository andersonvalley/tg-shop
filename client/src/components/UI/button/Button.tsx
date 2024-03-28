import React from 'react'
import cl from './button.module.scss'
import { IButton } from './Button.interface'

export const Button: React.FC<IButton> = ({ type, children }) => {
  return (
    <button type={type} className={cl.button}>
      {children}
    </button>
  )
}
