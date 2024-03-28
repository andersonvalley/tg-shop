import { FormEvent, useEffect, useRef, useState } from 'react'
import cl from './login.module.scss'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../../../service/auth/Auth.service'
import { ILoginRequest, IUserResponse, IUserResponseError } from '../../../service/auth/Auth.interface'
import { AxiosError } from 'axios'
import { useUserStore } from '../../../store/user.state'
import { saveTokenStorage } from '../../../service/auth/Auth.helpers'

export const Login = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [activeInput, setActiveInput] = useState(0)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const { saveUser } = useUserStore(store => store)
  const mutation = useMutation({
    mutationFn: (code: ILoginRequest) => AuthService.login(code),
    onError: (error: AxiosError<IUserResponseError>) => {
      console.log(error.response?.data.message)
    },
    onSuccess: (data: IUserResponse) => {
      saveUser(data)
      saveTokenStorage(data.accessToken)
    },
  })

  useEffect(() => {
    if (activeInput === inputValues.length) return

    inputRef.current = document.querySelectorAll('input')[activeInput]
    inputRef.current.focus()
  }, [activeInput, inputValues])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValues.length !== 6) return

    const formData = { code: Number(inputValues.join('')) }
    mutation.mutate(formData)
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)

    if (value === '') {
      setActiveInput(prev => Math.max(prev - 1, 0))
    } else {
      setActiveInput(prev => Math.min(prev + 1, inputValues.length - 1))
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (!event.clipboardData) return

    const pastedText = event.clipboardData.getData('text')
    const characters = pastedText.split('')
    setInputValues(characters.slice(0, 6))
    setActiveInput(0)
  }

  return (
    <section className={cl.section}>
      <div className={cl.login}>
        <h1 className={cl.title}>Вход в TG Shop</h1>

        <p>
          Получите код в боте{' '}
          <a className={cl.link} target="_blank" href="https://t.me/registerthshopbot">
            TG Shop
          </a>
        </p>

        <form className={cl.form} onSubmit={handleSubmit}>
          <ul className={cl.list}>
            {inputValues.map((value, idx) => {
              return (
                <li key={idx} className={cl.item}>
                  <input
                    ref={inputRef}
                    onClick={() => setActiveInput(idx)}
                    onChange={e => handleChange(idx, e.target.value)}
                    onPaste={handlePaste}
                    value={value}
                    className={activeInput === idx ? cl.active : ''}
                    maxLength={1}
                    minLength={1}
                    required
                    type="text"
                  />
                </li>
              )
            })}
          </ul>
          <p className={cl.error}>{mutation.isError ? mutation.error?.response?.data.message : ''}</p>
          <div className={cl.bwrapper}>
            <button type="submit" className={cl.button}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
