import { FormEvent, useState } from 'react'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import { useToken } from './hooks/useToken'

import cl from './start.module.scss'
import { useNavigate } from 'react-router-dom'
import { DYNAMIC_LINK } from '../../config/Paths'
import { useShopStore } from '../../../store/shop.state'

export const Start = () => {
  const navigate = useNavigate()
  const { id } = useShopStore(store => store.currentShop)
  const [value, setValue] = useState('')
  const { mutate: sendToken, error } = useToken()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendToken({ token: value })
    navigate(DYNAMIC_LINK(id).CATALOG)
  }

  return (
    <>
      <h1 className="title">Создайте магазин</h1>
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
