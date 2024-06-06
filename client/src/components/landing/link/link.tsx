import Link from 'next/link'
import React from 'react'

import styles from './link.module.scss'

interface Props {
  text: string
  path: string
  xl?: boolean
  justText?: boolean
  target?: string
}

export const LinkLanding = ({ text, path, xl, justText, target }: Props) => {
  const xlBtn = xl ? styles.xl : ''
  const justBtn = justText ? styles.justText : ''

  return (
    <Link target={target} href={path} scroll={false} className={[styles.button, xlBtn, justBtn].join(' ')}>
      {text}
    </Link>
  )
}
