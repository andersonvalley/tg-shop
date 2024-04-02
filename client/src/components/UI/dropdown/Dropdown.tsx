import { ReactNode } from 'react'

import cl from './dropdown.module.scss'

interface Props {
  children: ReactNode
  closeDropdowm: () => void
}

export const DropdownUi = ({ children, closeDropdowm }: Props) => {
  return (
    <>
      <div className={cl.dropdown}>{children}</div>
      <div onClick={closeDropdowm} className={cl.overlay}></div>
    </>
  )
}
