import React, { FormEvent, useState } from 'react'

import styles from './start.module.scss'
import { Input } from '@/src/components/UI/input/input'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { useToken } from './useToken'

export const ShopModal = () => {
  const [value, setValue] = useState('')
  const { mutate: sendToken, error, status } = useToken()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendToken({ token: value })
  }

  return (
    <>
      <ul className={styles.list}>
        <li>
          1. Запустите бота{' '}
          <a className="link" href="https://t.me/BotFather" target="_blank">
            @BotFather
          </a>{' '}
          в Телеграм
        </li>
        <li>2. Нажмите /newbot</li>
        <li>3. Введите название магазина</li>
        <li>4. Придумайте ссылку для магазина. Она должна оканчиваться на Bot, например, CafeBot</li>
        <li>5. Бот пришлет токен</li>
      </ul>

      <form onSubmit={submitHandler} className={styles.form}>
        <Input placeholder="Введите токен" value={value} onChange={e => setValue(e.target.value)} />
        <SubmitButton disabled={status === 'pending'} type="submit">
          {status === 'pending' ? 'Создание...' : 'Отправить'}
        </SubmitButton>
        <p className="error">{error?.response?.data.message}</p>
      </form>
    </>
  )
}
