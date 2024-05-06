import React, { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  width?: string
  className?: string
}

import './main.scss'
import styles from './layout.module.scss'

export const Wrapper = ({ title, children, width, className }: Props) => {
  return (
    <>
      <h1 className={[styles.title, className].join(' ')}>{title}</h1>
      <div style={{ maxWidth: width }} className={styles.line}></div>
      {children}
    </>
  )
}
