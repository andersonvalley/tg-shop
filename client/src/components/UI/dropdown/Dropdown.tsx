import { ReactNode } from 'react'

import styles from './dropdown.module.scss'

interface Props {
  children: ReactNode
  closeDropdowm: () => void
}

export const DropdownUi = ({ children, closeDropdowm }: Props) => {
  return (
    <>
      <div className={styles.dropdown}>{children}</div>
      <div onClick={closeDropdowm} className={styles.overlay}></div>
    </>
  )
}
