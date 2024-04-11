'use client'

import Link from 'next/link'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GoPlus } from 'react-icons/go'
import { animated } from '@react-spring/web'
import { useShopStore } from '../../store/shop.state'
import { useUiStore } from '../../store/ui.store'
import { useAnimation } from './useAnimation'
import { IShop } from '@/src/types/shop.interface'
import { PATHS } from '@/src/constants/pages-url.config'

import styles from './sidebar.module.scss'
import { SidebarMenu } from './menu/menu'
import { useShop } from '@/src/app/app/start/useShop'

export const Sidebar = () => {
  const { styles: stylesSpring, measureRef, setExpanded } = useAnimation()
  const { shops, currentShop, saveCurrentShop } = useShopStore(store => store)
  const { toogleMobileMenu } = useUiStore(store => store)
  const { data } = useShop()

  const setCurrentShop = (item: IShop) => {
    saveCurrentShop(item)
    setExpanded(false)
  }

  return (
    <aside className={toogleMobileMenu ? [styles.sidebar, styles.sidebarOpen].join(' ') : styles.sidebar}>
      <nav className={`${styles.nav} ${data && data?.length > 0 ? '' : styles.hidden}`}>
        <button onClick={() => setExpanded(val => !val)} className={[styles.link, styles.shop].join(' ')}>
          <p className={styles.shopAvatar}>{currentShop?.firstName[0]}</p>
          <span>{currentShop?.firstName}</span> <MdKeyboardArrowDown />
        </button>
        <animated.div style={{ overflow: 'hidden', ...stylesSpring }}>
          <ul ref={measureRef} className={styles.shopList}>
            {shops?.map(item => {
              return (
                <li className={styles.hiddenItem} key={item.id}>
                  <div className={[styles.link, styles.shop, styles.hidden].join(' ')}>
                    <div
                      onClick={() => setCurrentShop(item)}
                      className={[styles.shopAvatar, styles.shopAvatarSmall].join(' ')}
                    >
                      {currentShop.firstName[0]}
                    </div>
                    <div className={styles.col}>
                      <span onClick={() => setCurrentShop(item)} className={styles.small}>
                        {item.firstName}
                      </span>
                      <Link href={`https://t.me/${item.username}`} className={styles.linkBot} target="_blank">
                        @{item.username}
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
            <li ref={measureRef} className={styles.center}>
              <Link className={styles.add} href={PATHS.START + '?add=new'}>
                <GoPlus size={21} /> Добавить магазин
              </Link>
            </li>
          </ul>
        </animated.div>
        <div className={styles.line}></div>
        <SidebarMenu />
      </nav>
    </aside>
  )
}
