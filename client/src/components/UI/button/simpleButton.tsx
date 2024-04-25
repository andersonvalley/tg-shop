import React from 'react'

import styles from './button.module.scss'

export interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const SimpleButton = ({ onClick, children, className }: Props) => {
  return (
    <button onClick={onClick} type="button" className={[styles.simpleButton, className].join(' ')}>
      {children}
    </button>
  )
}
