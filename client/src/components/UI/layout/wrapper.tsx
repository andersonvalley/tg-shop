import React, { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  width: string
}

import './main.scss'
import styles from './layout.module.scss'

export const Wrapper = ({ title, children, width }: Props) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div style={{ maxWidth: width }} className={styles.line}></div>
      {children}
    </>
  )
}
