'use client'

import React from 'react'
import styles from './search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { useSearchAndSortStore } from '../../store/searchAndSort'
import { motion } from 'framer-motion'

export const Search = () => {
  const { search, setSearch, setCategory } = useSearchAndSortStore()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory('')
    setSearch(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(100px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true }}
      className={[styles.search, 'card animate'].join(' ')}
    >
      <input
        value={search}
        onChange={changeHandler}
        className={styles.input}
        type="text"
        placeholder="Поиск..."
      />
      <FiSearch className={styles.icon} size={18} />
    </motion.div>
  )
}
