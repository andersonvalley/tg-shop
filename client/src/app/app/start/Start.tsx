'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useToken } from './useToken'

import styles from './start.module.scss'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'

export const StartPage = () => {
  const [value, setValue] = useState('')
  const { mutate: sendToken, error } = useToken()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendToken({ token: value })
  }

  return (
    <>
      <h1 className="title">Создайте магазин</h1>
      <div className={[styles.card, 'animate'].join(' ')}>
        <div className={styles.card__wrapper}>
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
            <SubmitButton type="submit">Войти</SubmitButton>
            <p className="error">{error?.response?.data.message}</p>
          </form>
        </div>
      </div>
    </>
  )
}
