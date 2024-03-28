import React from 'react'
import { IInput } from './Input.interface'

import cl from './input.module.scss'

export const Input: React.FC<IInput> = props => {
  return (
    <input
      className={cl.input}
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required
      spellCheck={false}
    />
  )
}
