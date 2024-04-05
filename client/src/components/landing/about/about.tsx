import React from 'react'

import styles from '../page.module.scss'

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.tags}>
        <div className={styles.tag}>👍 48</div>
        <div className={styles.tag}>🔥 112</div>
        <div className={styles.tag}>🚀 67</div>
        <div className={styles.tag}>❤️ 59</div>
        <div className={styles.tag}>💣 84</div>
      </div>
      <p>
        <b>Ракета</b> — это простой сервис, с которым вы запустите продажи в Telegram без программистов за 15
        минут
      </p>
    </section>
  )
}
