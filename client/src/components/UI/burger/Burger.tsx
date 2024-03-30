import React from 'react'
import './burger.scss'
import { IBurger } from './burger.interface'

export const Burger: React.FC<IBurger> = ({ checked, onChange }) => {
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
