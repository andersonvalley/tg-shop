import { Link, NavLink, useLocation } from 'react-router-dom'
import { APP_PATH } from '../../routes/config/Paths'
import { Menu, SubMenu } from './sidebarMenu.data'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GoPlus } from 'react-icons/go'
import { animated } from '@react-spring/web'
import { IoSettingsOutline } from 'react-icons/io5'
import { useShopStore } from '../../store/shop.state'
import { useAnimation } from './hooks/useAnimation'

import cl from './sidebar.module.scss'
import { IShop } from '../../service/shop/shop.interface'
import { useEffect, useState } from 'react'
import { useUiStore } from '../../store/ui.store'

export const Sidebar = () => {
  const { shops, currentShop } = useShopStore(store => store)
  const { toogleMobileMenu } = useUiStore(store => store)
  const [showMenu, setShowMenu] = useState(true)
  const location = useLocation()
  const { stylesSubMenu, styles, measureRef, measureRefSubMenu, setExpandedSubMenu, setExpanded } =
    useAnimation()

  const { saveCurrentShop } = useShopStore(store => store)

  const setCurrentShop = (item: IShop) => {
    saveCurrentShop(item)
    setExpanded(false)
  }

  useEffect(() => {
    if (location.pathname === APP_PATH.START) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }, [location.pathname])

  return (
    <aside className={toogleMobileMenu ? [cl.sidebar, cl.sidebarOpen].join(' ') : cl.sidebar}>
      <nav className={showMenu ? [cl.nav, cl.navActive].join(' ') : cl.nav}>
        <button onClick={() => setExpanded(val => !val)} className={[cl.link, cl.shop].join(' ')}>
          <div className={cl.shopAvatar}>{currentShop?.firstName[0]}</div>
          <span>{currentShop?.firstName}</span> <MdKeyboardArrowDown />
        </button>
        <animated.div style={{ overflow: 'hidden', ...styles }}>
          <ul ref={measureRef} className={cl.shopList}>
            {shops?.map(item => {
              return (
                <li className={cl.hiddenItem} key={item.id}>
                  <div className={[cl.link, cl.shop, cl.hidden].join(' ')}>
                    <div
                      onClick={() => setCurrentShop(item)}
                      className={[cl.shopAvatar, cl.shopAvatarSmall].join(' ')}
                    >
                      {currentShop.firstName[0]}
                    </div>
                    <div className={cl.col}>
                      <span onClick={() => setCurrentShop(item)} className={cl.small}>
                        {item.firstName}
                      </span>
                      <Link to={`https://t.me/${item.username}`} className={cl.linkBot} target="_blank">
                        @{item.username}
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
            <li ref={measureRef} className={cl.center}>
              <Link className={cl.add} to={APP_PATH.START}>
                <GoPlus size={21} /> Добавить магазин
              </Link>
            </li>
          </ul>
        </animated.div>
        <div className={cl.line}></div>
        <ul className={cl.menu}>
          {Menu.map(item => {
            return (
              <li key={item.title} className={cl.item}>
                <NavLink
                  className={({ isActive }) => (isActive ? [cl.active, cl.link].join(' ') : cl.link)}
                  to={item.link}
                >
                  {item.icon} <span>{item.title}</span>
                </NavLink>
              </li>
            )
          })}

          <li className={cl.item}>
            <button
              onClick={() => setExpandedSubMenu(prev => !prev)}
              className={[cl.link, cl.settings].join(' ')}
            >
              <IoSettingsOutline size={23} /> <span>Настройки</span> <MdKeyboardArrowDown />
            </button>

            <animated.div style={{ overflow: 'hidden', ...stylesSubMenu }}>
              <ul ref={measureRefSubMenu} className={cl.subMenu}>
                {SubMenu.map(item => {
                  return (
                    <li key={item.title} className={cl.item}>
                      <NavLink
                        className={({ isActive }) => (isActive ? [cl.active, cl.link].join(' ') : cl.link)}
                        to={item.link}
                      >
                        {item.icon} <span>{item.title}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </animated.div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
