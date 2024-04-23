'use client'

import React from 'react'
import Image from 'next/image'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { SubscriberService } from '@/src/services/subscriber/subscriber.service'
import { useInitData } from '@vkruglikov/react-telegram-web-app'
import { useQuery } from '@tanstack/react-query'
import { IoMdHeartEmpty } from 'react-icons/io'
import { PiShoppingCartBold } from 'react-icons/pi'
import { SpinUi } from '@/src/components/UI/loader/spin'

import cl from '../../../../components/header/header.module.scss'

export const HeaderWebApp = () => {
  const [initDataUnsafe] = useInitData()

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getSubscriberById, initDataUnsafe?.user?.id],
    queryFn: () => SubscriberService.getById(String(initDataUnsafe?.user?.id)),
    enabled: !!initDataUnsafe?.user?.id,
  })

  return (
    <header className={cl.header}>
      <div className={[cl.wrapperLanding, cl.wrapperLandingWebApp].join(' ')}>
        <div className={cl.currentUser}>
          {isLoading ? (
            <SpinUi />
          ) : (
            <button className={cl.user}>
              <Image
                src={data?.avatar_url ? data.avatar_url : '/user.png'}
                alt={'user avatar'}
                className={cl.avatar}
                width={30}
                height={30}
              ></Image>

              <div className={cl.inner}>
                <p className={cl.firstName}>{initDataUnsafe?.user?.first_name}</p>
                <span className={cl.username}>@{initDataUnsafe?.user?.username}</span>
              </div>
            </button>
          )}
        </div>

        <div className={cl.group}>
          <button className={cl.btn}>
            <IoMdHeartEmpty size={20} />
          </button>

          <button className={cl.btn}>
            <PiShoppingCartBold size={20} />
            <span className={cl.count}>12</span>
          </button>
        </div>
      </div>
    </header>
  )
}
