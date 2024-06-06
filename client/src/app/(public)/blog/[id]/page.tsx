import { LinkLanding } from '@/src/components/landing/link/link'
import styles from '../../../components/landing/page.module.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Демо версия интернет магазина Ракета',
  description: 'Демо версия интернет магазина в Телеграм. Попробуйте сервис Ракета в действии.',
}

export default function BlogPage() {
  return (
    <section className={styles.hero}>
      <div className={styles.info}>
        <h1 className={styles.title}>Попробуйте сервис Ракета в действии</h1>
        <p className={styles.subtitle}>
          Мы запустили демо-бот — вымышленный магазин по продаже цветов. Посетите его, полистайте меню,
          сделайте заказ и узнайте, как будет работать Ваш чат-бот.
        </p>

        <LinkLanding text="Посетить" xl={true} path="https://t.me/plants_rocket_shop_bot" target="_blank" />
      </div>

      <video className={styles.video} muted playsInline autoPlay src="/video.mp4"></video>
    </section>
  )
}
