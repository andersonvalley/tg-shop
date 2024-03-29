import { FormEvent, useState } from 'react'
import { Input } from '../../../components/UI/input/Input'
import cl from './start.module.scss'
import { Button } from '../../../components/UI/button/Button'
import { useToken } from './hooks/useToken'

export const Start = () => {
  const [value, setValue] = useState('')
  const { mutate, error } = useToken()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ token: value })
  }

  return (
    <>
      <h1 className={cl.title}>Шаг 1: Создайте магазин</h1>
      <div className={[cl.card, 'animate'].join(' ')}>
        <div className={cl.card__wrapper}>
          <ul className={cl.list}>
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

          <form onSubmit={submitHandler} className={cl.form}>
            <Input placeholder="Введите токен" value={value} onChange={e => setValue(e.target.value)} />
            <Button type="submit">Войти</Button>
            <p className="error">{error?.response?.data.message}</p>
          </form>
        </div>
      </div>
    </>
  )
}
