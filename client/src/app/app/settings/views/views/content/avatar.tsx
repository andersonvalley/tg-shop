import React from 'react'
import Image from 'next/image'

import { useShopStore } from '@/src/store/shop.state'
import '../../views.scss'
import avatar from '../../../../../../assets/1.png'

export const Avatar = () => {
  const { username } = useShopStore(store => store.currentShop)

  return (
    <div className="section">
      <Image className="img" src={avatar} width={220} height={400} alt="avatar" />
      <ul className="list">
        <li>
          1. Перейдите в бота{' '}
          <a target="_blank" href="https://t.me/BotFather">
            @BotFather
          </a>{' '}
          в Телеграм
        </li>
        <li>
          2. Откройте меню и выберите команду <b>/mybots</b>
        </li>
        <li>
          3. Выберите вашего бота <b>@{username}</b>
        </li>
        <li>
          4. Нажмите <b>Edit Bot</b> → <b>Edit Botpic</b>
        </li>
        <li>5. Отправьте фотографию аватарки</li>
      </ul>
    </div>
  )
}
