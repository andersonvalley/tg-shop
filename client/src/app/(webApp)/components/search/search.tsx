'use client'

import React, { useState } from 'react'

import styles from './search.module.scss'
import { FiSearch } from 'react-icons/fi'

export const Search = () => {
  const [value, setValue] = useState('')
  return (
    <div className={styles.search}>
      <input className={styles.input} type="text" placeholder="Поиск" />
      <FiSearch className={styles.icon} size={18} />
    </div>
  )
}
