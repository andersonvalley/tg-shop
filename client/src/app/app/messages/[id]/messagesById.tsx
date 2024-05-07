'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/src/components/UI/input/input'

import styles from '../messages.module.scss'
import { useGetMessages } from '../fetch/useGetMessages'
import { normalizeOnlyTime } from '@/src/utils/normalizeDate'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { useGetUsersMessage } from '../fetch/useGetUser'
import { useCreateMessage } from '../fetch/useCreateMessage'
import { useShopStore } from '@/src/store/shop.state'
import { BiLogoTelegram } from 'react-icons/bi'
import { useCurrentUserStore } from '../store/useCurrentUser'

export const MessagesById = () => {
  const [value, setValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { items, isError, isLoading } = useGetMessages()
  const { createHandler } = useCreateMessage()

  const { id, first_name } = useShopStore(store => store.currentShop)
  const { currentUser } = useCurrentUserStore()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formDate = {
      text: value,
      shopId: id,
      subscriberId: items[0].subscriber_.id,
      is_from_user: false,
    }

    createHandler(formDate)

    setValue('')
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        // behavior: 'smooth',
      })
    }
  }, [items])

  return (
    <div className={styles.messagesWrapper}>
      <div className={styles.messages}>
        <div className={styles.messagesHeader}>
          <Image
            src={items[0]?.subscriber_?.avatar_url ? items[0]?.subscriber_?.avatar_url : '/user.png'}
            width={50}
            height={50}
            alt="user"
          />
          <span className={styles.name}>
            {items[0]?.subscriber_?.first_name + ' ' + items[0]?.subscriber_?.last_name}
          </span>
        </div>

        <div className={styles.messagesContent}>
          <ul>
            {isError && <li className="empty">Ошибка загрузки</li>}
            {isLoading && <SpinUi />}
            {items.map(item => {
              return (
                <li
                  key={item.id}
                  className={
                    item.is_from_user
                      ? styles.messageItem
                      : [styles.messageItemRight, styles.messageItem].join(' ')
                  }
                >
                  {item.is_from_user ? (
                    <Image
                      src={item.subscriber_.avatar_url ? item.subscriber_.avatar_url : '/user.png'}
                      width={50}
                      height={50}
                      alt="user"
                    />
                  ) : (
                    <span className={styles.avatar}>
                      <span>{first_name[0]}</span>
                    </span>
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.name}>
                      {item.is_from_user
                        ? item.subscriber_?.first_name + ' ' + item.subscriber_?.last_name
                        : first_name}
                      <span className={styles.date}>{normalizeOnlyTime(item.created_date)}</span>
                    </span>
                    <p className={styles.message}>{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.messagesFooter}>
          <form onSubmit={submit}>
            <Input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Написать сообщение..."
              icon={<BiLogoTelegram className={styles.icon} size={23} />}
            />
          </form>
        </div>
        <span ref={scrollRef}></span>
      </div>
    </div>
  )
}
