import React from 'react'

import styles from './button.module.scss'

export interface Props {
  type?: 'submit' | 'reset' | 'button'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const SubmitButton: React.FC<Props> = ({ type = 'submit', children, className, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={[styles.button, className].join(' ')}>
      {children}
    </button>
  )
}
