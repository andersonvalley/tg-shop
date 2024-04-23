import { ReactNode } from 'react'

import styles from './dropdown.module.scss'

interface Props {
  children: ReactNode
  closeDropdowm: () => void
  className?: string
}

export const DropdownUi = ({ children, closeDropdowm, className }: Props) => {
  return (
    <>
      <div className={[className, styles.dropdown].join(' ')}>{children}</div>
      <div onClick={closeDropdowm} className={styles.overlay}></div>
    </>
  )
}
