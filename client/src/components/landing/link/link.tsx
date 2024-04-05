import Link from 'next/link'
import React from 'react'

import styles from './link.module.scss'

interface Props {
  text: string
  path: string
  xl?: boolean
  justText?: boolean
}

export const LinkLanding = ({ text, path, xl, justText }: Props) => {
  const xlBtn = xl ? styles.xl : ''
  const justBtn = justText ? styles.justText : ''

  return (
    <Link
      target={justBtn ? '_blank' : '_self'}
      href={path}
      className={[styles.button, xlBtn, justBtn].join(' ')}
    >
      {text}
    </Link>
  )
}
