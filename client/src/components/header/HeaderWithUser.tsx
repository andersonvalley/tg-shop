import { Link } from 'react-router-dom'
import { APP_PATH } from '../../routes/config/Paths'
import { useUserStore } from '../../store/user.state'

import logo from '../../assets/img/logo.png'
import cl from './header.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const HeaderWithUser = () => {
  const { firstName, lastName, avatarUrl } = useUserStore(store => store.user)

  return (
    <header className={cl.header}>
      <div className={cl.wrapper}>
        <div className={cl.burger}>
          <div className={cl.line}></div>
        </div>
        <Link to={APP_PATH.CATALOG} className={cl.logo}>
          <img src={logo} alt="logo" />
          Ракета
        </Link>

        <button className={cl.user}>
          <img src={avatarUrl} alt={'user avatar'} className={cl.avatar}></img>
          <p>
            {firstName} {lastName} <MdKeyboardArrowDown />
          </p>
        </button>
      </div>
    </header>
  )
}
