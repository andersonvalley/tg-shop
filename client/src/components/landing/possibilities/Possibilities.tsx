import React from 'react'

import styles from '../page.module.scss'
import Image from 'next/image'

export const Possibilities = () => {
  const items = [
    {
      title: 'Откройте новый канал продаж',
      text: 'Привлекйте клиентов множеством способов: Telegram Ads, посевы в чатах и каналах, QR-коды в заведении и т.д.',
      img: '/landings/frame1.webp',
    },
    {
      title: 'Соберите базу посетителей и клиентов',
      text: '🔥️ Люди, которые открыли вашу витрину — автоматически сохраняются в базу и подписываются на рассылки.',
      img: '/landings/frame2.webp',
    },
    {
      title: 'Будьте на связи с аудиторией',
      text: 'Консультируйте людей в привычном для них мессенджере. Даже закрыв магазин, вы сможете продолжить общение.',
      img: '/landings/frame3.webp',
    },
    {
      title: 'Окажитесь в кармане у клиента',
      text: 'После посещения магазина, он навсегда сохраняется у человека в списке чатов, не позволяя забыть о вас.',
      img: '/landings/frame4.webp',
    },
    {
      title: 'Увеличивайте продажи с помощью рассылок',
      text: 'Открываемость сообщений — 92%. Рассказывайте о новинках и делитесь новостями с посетителями и клиентами.',
      img: '/landings/frame5.webp',
    },
  ]
  return (
    <section id="pos" className={[styles.hero, styles.section].join(' ')}>
      <ul className={styles.pos}>
        {items.map(item => {
          return (
            <li className={styles.posItem} key={item.title}>
              <div className={styles.posWrapper}>
                <Image src={item.img} alt={item.title} height={300} width={300} />
              </div>

              <div className={styles.text}>
                <h3 className={styles.title_m}>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
