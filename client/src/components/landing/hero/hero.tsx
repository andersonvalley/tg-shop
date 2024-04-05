import React from 'react'

import styles from '../page.module.scss'
import { PATHS } from '@/src/constants/pages-url.config'
import { LinkLanding } from '../link/link'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.info}>
        <div className={styles.tag}>🔥 За 15 мин</div>
        <h1 className={styles.title}>Создайте магазин в Telegram</h1>
        <p className={styles.subtitle}>Продавайте там, где удобно людям</p>

        <div className={styles.group}>
          <LinkLanding xl={true} path={PATHS.LOGIN} text="Начать бесплатно" />
          <LinkLanding justText={true} path="t.me/" text="Пример магазина" />
        </div>
      </div>

      <video className={styles.video} muted playsInline autoPlay src="/video.mp4"></video>
    </section>
  )
}
