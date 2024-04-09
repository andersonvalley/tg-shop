import React from 'react'
import { formType } from '../app/app/settings/delivery/contentModal'

export const useValidate = () => {
  const onChange = (value: string, fn: (value: string) => void) => {
    if (!/^\d*$/.test(value)) return

    fn(value)
  }

  return { onChange }
}
