import Link from 'next/link'
import React from 'react'

import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Создано при помощи{' '}
        <Link target="_blank" href="https://tgrocket.ru?utm=tgshop">
          Ракета
        </Link>
      </p>
    </footer>
  )
}
