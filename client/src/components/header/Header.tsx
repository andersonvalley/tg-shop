'use client'

import Image from 'next/image'
import { PATHS } from '@/src/constants/pages-url.config'
import Link from 'next/link'
import React from 'react'
import { useUserStore } from '../../store/user.state'
import { animated } from '@react-spring/web'
import { RefObject } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useUiStore } from '../../store/ui.store'
import { HeaderSubmenu } from './header.menu'
import { Burger } from '../UI/burger/burger'
import { useRouter } from 'next/navigation'
import { useLogout } from './useLogout'
import { useAnimate } from './useAnimate'
import styles from './header.module.scss'
import { useCheckAuth } from '@/src/hooks/useCheckAuth'
import { Loader } from '../UI/loader/loader'
import { createPortal } from 'react-dom'

export const Header = () => {
  const router = useRouter()
  const { firstName, lastName, avatarUrl } = useUserStore(store => store.user)
  const { setToogleMobileMenu, toogleMobileMenu } = useUiStore(store => store)
  const { setExpanded, buttonRef, menuRef, measureRef, subMenuStyles } = useAnimate()
  const { fetchLogout } = useLogout()
  const { status } = useCheckAuth()

  const clickMenuItemHandler = (name: string) => {
    setExpanded(false)
    return name === 'Выйти' ? fetchLogout() : router.push(PATHS.TARIFF, { scroll: false })
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link scroll={false} href={PATHS.CATALOG} className={styles.logo}>
          <Image src="/logo.png" width={100} height={40} alt="logo" />
          <span>Ракета</span>
        </Link>

        <div className={styles.userWrapper}>
          {status === 'success' && (
            <button
              ref={buttonRef as RefObject<HTMLButtonElement>}
              onClick={() => setExpanded(val => !val)}
              className={styles.user}
            >
              <Image
                src={avatarUrl ? avatarUrl : '/user.png'}
                alt={'user avatar'}
                className={styles.avatar}
                width={30}
                height={30}
              ></Image>

              <p>
                {firstName} {lastName} <MdKeyboardArrowDown />
              </p>
            </button>
          )}
        </div>

        <div className={styles.burgerApp}>
          <Burger checked={toogleMobileMenu} onChange={setToogleMobileMenu} />
        </div>

        <animated.div
          ref={menuRef as RefObject<HTMLDivElement>}
          style={{ overflow: 'hidden', ...subMenuStyles }}
          className={styles.submenu}
        >
          <ul ref={measureRef} className={styles.submenuList}>
            {HeaderSubmenu.map(item => {
              return (
                <li className={styles.submenuItem} key={item.name}>
                  <button onClick={() => clickMenuItemHandler(item.name)}>
                    <item.icon size={22} /> {item.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </animated.div>
      </div>

      {status === 'pending' && createPortal(<Loader />, document.body)}
    </header>
  )
}
