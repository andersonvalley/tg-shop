'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { QUERY_KEY } from '@/src/constants/queryKey'
import { SubscriberService } from '@/src/services/subscriber/subscriber.service'
import { MainButton, useInitData } from '@vkruglikov/react-telegram-web-app'
import { useQuery } from '@tanstack/react-query'
import { IoMdHeartEmpty } from 'react-icons/io'
import { PiShoppingCartBold } from 'react-icons/pi'
import { SpinUi } from '@/src/components/UI/loader/spin'

import cl from '../../../../components/header/header.module.scss'
import { usePathname } from '../../hooks/usePath'
import { useCart } from '../../store/useCart'
import { useGetCart } from '../../hooks/useGetCart'
import { useRouter } from 'next/navigation'

export const HeaderWebApp: React.FC = () => {
  const [initDataUnsafe] = useInitData()
  const { hash, initialPathname } = usePathname()
  const router = useRouter()

  const { setCart } = useCart()

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getSubscriberById, initDataUnsafe?.user?.id],
    queryFn: () => SubscriberService.getById(String(initDataUnsafe?.user?.id)),
    enabled: !!initDataUnsafe?.user?.id,
  })

  const { cart } = useGetCart()

  useEffect(() => {
    if (!cart) return
    setCart(cart)
  }, [cart, setCart])

  const navigateToCart = () => {
    router.push(`${initialPathname}/cart/${hash}`)
  }

  return (
    <motion.header
      initial={{ scale: 0, rotate: 180 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={cl.header}
    >
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
          <Link href={`${initialPathname}/favorite/${hash}`} className={cl.btn}>
            <IoMdHeartEmpty size={20} />
          </Link>

          <Link href={`${initialPathname}/cart/${hash}`} className={cl.btn}>
            <PiShoppingCartBold size={20} />
            {cart && cart.length > 0 && <span className={cl.count}>{cart && cart.length}</span>}
          </Link>
        </div>
      </div>

      {cart && cart?.length > 0 && <MainButton text="В корзине что-то есть" onClick={navigateToCart} />}
    </motion.header>
  )
}
