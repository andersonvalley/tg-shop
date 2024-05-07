'use client'

import React from 'react'
import styles from './messages.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeOnlyTime } from '@/src/utils/normalizeDate'
import { useGetUsersMessage } from './fetch/useGetUser'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { PATHS } from '@/src/constants/pages-url.config'
import { useParams } from 'next/navigation'
import { useCurrentUserStore } from './store/useCurrentUser'

export const Users = () => {
  const { items, isError, isLoading } = useGetUsersMessage()
  const { setCurrentUser } = useCurrentUserStore()
  const params = useParams()

  return (
    <div className={params?.id ? [styles.users, styles.userHidden].join(' ') : styles.users}>
      <ul className={styles.userList}>
        {isError && <li className="empty">Ошибка загрузки</li>}
        {items.length === 0 && <li className={styles.empty}>Нет сообщений</li>}
        {isLoading && <SpinUi />}
        {items?.map(item => {
          return (
            <li key={item.subscriber.id} className={styles.userItem}>
              <Link
                className={styles.link}
                onClick={() => setCurrentUser(item)}
                href={`${PATHS.MESSAGES}/${item.subscriber.id}`}
              >
                <Image
                  src={item.subscriber.avatar_url ? item.subscriber.avatar_url : '/user.png'}
                  width={50}
                  height={50}
                  alt="user"
                />
                <div className={styles.grow}>
                  <span className={styles.name}>
                    {item.subscriber?.first_name} {item.subscriber?.last_name}
                  </span>
                  <p className={styles.text}>{item.text}</p>
                </div>
                <span className={styles.date}>{normalizeOnlyTime(item.created_date)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
