import { Link, useNavigate } from 'react-router-dom'
import { APP_PATH } from '../../routes/config/Paths'
import { useUserStore } from '../../store/user.state'
import { animated } from '@react-spring/web'

import { RefObject, useEffect, useRef, useState } from 'react'
import { config, useSpring } from '@react-spring/web'
import { useMutation } from '@tanstack/react-query'
import useMeasure from 'react-use-measure'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AuthService } from '../../service/auth/Auth.service'
import { removeTokenStorage } from '../../service/auth/Auth.helpers'
import { Burger } from '../UI/burger/Burger'
import { HeaderSubmenu } from './headerMenu.data'

import cl from './header.module.scss'
import logo from '../../assets/img/logo.png'
import user from '../../assets/img/user.png'
import { useUiStore } from '../../store/ui.store'

export const HeaderWithUser = () => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [measureRef, { height }] = useMeasure()
  const { firstName, lastName, avatarUrl } = useUserStore(store => store.user)
  const { deleteAllUser } = useUserStore(store => store)
  const { setToogleMobileMenu, toogleMobileMenu } = useUiStore(store => store)

  const { mutate: fetchLogout } = useMutation({
    mutationFn: AuthService.logut,
    onSuccess: () => {
      removeTokenStorage()
      navigate(APP_PATH.LOGIN)
      deleteAllUser()
    },
  })

  const styles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: expanded ? height + 16 : 0,
      top: expanded ? '60px' : '0px',
      opacity: expanded ? 1 : 0,
    },
  })

  const buttonRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLElement | null>(null)

  const clickHandler = (e: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)

    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [])

  const clickMenuItemHandler = (name: string) => {
    setExpanded(false)
    return name === 'Выйти' ? fetchLogout() : navigate(APP_PATH.TARIFF)
  }

  return (
    <header className={cl.header}>
      <div className={cl.wrapper}>
        <Link to={APP_PATH.CATALOG} className={cl.logo}>
          <img src={logo} alt="logo" />
          <span>Ракета</span>
        </Link>

        <div className={cl.userWrapper}>
          <button
            ref={buttonRef as RefObject<HTMLButtonElement>}
            onClick={() => setExpanded(val => !val)}
            className={cl.user}
          >
            <img src={avatarUrl ? avatarUrl : user} alt={'user avatar'} className={cl.avatar}></img>
            <p>
              {firstName} {lastName} <MdKeyboardArrowDown />
            </p>
          </button>
        </div>

        <div className={cl.burgerApp}>
          <Burger checked={toogleMobileMenu} onChange={setToogleMobileMenu} />
        </div>

        <animated.div
          ref={menuRef as RefObject<HTMLDivElement>}
          style={{ overflow: 'hidden', ...styles }}
          className={cl.submenu}
        >
          <ul ref={measureRef} className={cl.submenuList}>
            {HeaderSubmenu.map(item => {
              return (
                <li className={cl.submenuItem} key={item.name}>
                  <button onClick={() => clickMenuItemHandler(item.name)}>
                    {item.icon} {item.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </animated.div>
      </div>
    </header>
  )
}
