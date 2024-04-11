import React from 'react'
import './burger.scss'

export interface Props {
  checked: boolean
  onChange: () => void
}

export const Burger: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <input
      checked={checked}
      onChange={onChange}
      type="checkbox"
      role="button"
      aria-label="Display the menu"
      className="menu"
    />
  )
}
