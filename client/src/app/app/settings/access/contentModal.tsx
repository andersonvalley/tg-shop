'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { SelectUi } from '@/src/components/UI/select/select'

import { useValidate } from '@/src/hooks/useValidate'
import React, { useState } from 'react'

export interface formType {
  username: string
}

export const ContentModal = () => {
  const [values, setValues] = useState<formType>({
    username: '',
  })

  return (
    <form>
      <Input
        label="Юзернейм в Telegram"
        value={values.username}
        onChange={e => setValues({ ...values, username: e.target.value })}
        placeholder="@durov"
      />

      <div className="line"></div>
      <SubmitButton>Выдать доступ</SubmitButton>
    </form>
  )
}
