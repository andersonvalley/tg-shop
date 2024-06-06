import React from 'react'
import { PATHS } from '@/src/constants/pages-url.config'
import { LinkLanding } from '../link/link'

import styles from '../page.module.scss'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.info}>
        <div className={styles.tag}>🔥 За 15 мин</div>
        <h1 className={styles.title}>Создай свой онлайн-магазин в Telegram</h1>
        <p className={styles.subtitle}>Продавайте там, где удобно людям</p>

        <div className={styles.group}>
          <LinkLanding xl={true} path={PATHS.LOGIN} text="Начать бесплатно" />
          <LinkLanding
            justText={true}
            text="Пример магазина"
            path="https://t.me/plants_rocket_shop_bot"
            target="_blank"
          />
        </div>
      </div>

      <video className={styles.video} muted playsInline autoPlay src="/video.mp4"></video>
    </section>
  )
}
