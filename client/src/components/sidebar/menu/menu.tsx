import { Menu, SubMenu } from './sidebar.menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { animated } from '@react-spring/web'

import styles from '../sidebar.module.scss'
import { useAnimation } from '../useAnimation'
import { Url } from 'url'
import { useUiStore } from '@/src/store/ui.store'

export const SidebarMenu = () => {
  const pathname = usePathname()
  const { setToogleMobileMenu } = useUiStore(store => store)
  const { stylesSubMenu, measureRefSubMenu, setExpandedSubMenu } = useAnimation()

  return (
    <ul className={styles.menu}>
      {Menu.map(item => {
        return (
          <li key={item.title} className={styles.item}>
            <Link
              className={`${styles.link} ${pathname === item.link ? styles.active : ''}`}
              onClick={setToogleMobileMenu}
              href={item.link}
              scroll={false}
            >
              <item.icon size={23} /> <span>{item.title}</span>
            </Link>
          </li>
        )
      })}

      <li className={styles.item}>
        <button
          onClick={() => setExpandedSubMenu(prev => !prev)}
          className={[styles.link, styles.settings].join(' ')}
        >
          <IoSettingsOutline size={23} /> <span>Настройки</span> <MdKeyboardArrowDown />
        </button>

        <animated.div style={{ overflow: 'hidden', ...stylesSubMenu }}>
          <ul ref={measureRefSubMenu} className={styles.subMenu}>
            {SubMenu.map(item => {
              return (
                <li key={item.title} className={styles.item}>
                  <Link
                    className={`${styles.link} ${pathname === item.link ? styles.active : ''}`}
                    onClick={setToogleMobileMenu}
                    href={item.link}
                    scroll={false}
                  >
                    <item.icon size={23} /> <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </animated.div>
      </li>
    </ul>
  )
}
