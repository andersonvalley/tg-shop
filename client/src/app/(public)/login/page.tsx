'use client'

import { FormEvent } from 'react'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { useLogin } from './useLogin'
import { useInput } from './useInput'
import { LinkLanding } from '@/src/components/landing/link/link'

import styles from './login.module.scss'

export default function Login() {
  const { handleChange, handlePaste, activeInput, setActiveInput, inputValues, inputRef } = useInput()

  const { mutate, isError, error } = useLogin()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValues.length !== 6) return

    const formData = { code: Number(inputValues.join('')) }
    mutate(formData)
  }

  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h1 className={styles.title}>Вход в Ракету</h1>

        <p className={styles.subtitle}>
          Получите код в боте{' '}
          <LinkLanding justText={true} text="@login_rocket_bot" path="https://t.me/login_rocket_bot" />
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
            {inputValues.map((value, idx) => {
              return (
                <li key={idx} className={styles.item}>
                  <input
                    ref={inputRef}
                    onClick={() => setActiveInput(idx)}
                    onChange={e => handleChange(idx, e.target.value)}
                    onPaste={handlePaste}
                    value={value}
                    className={activeInput === idx ? styles.active : ''}
                    maxLength={1}
                    minLength={1}
                    required
                    autoComplete="off"
                    inputMode="numeric"
                    type="text"
                  />
                </li>
              )
            })}
          </ul>
          <p className={styles.error}>{isError ? error?.response?.data.message : ''}</p>
          <div className={styles.bwrapper}>
            <SubmitButton type="submit">Войти</SubmitButton>
          </div>
        </form>
      </div>
    </section>
  )
}
