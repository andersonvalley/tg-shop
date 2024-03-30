import { Link } from 'react-router-dom'
import cl from './header.module.scss'
import { APP_PATH } from '../../routes/config/Paths'
import { HeaderMenu } from './headerMenu.data'

import logo from '../../assets/img/logo.png'

export const Header = () => {
  return (
    <header className={cl.header}>
      <div className={cl.wrapper}>
        <div className={cl.burger}>
          <div className={cl.line}></div>
        </div>
        <Link to={APP_PATH.MAIN} className={cl.logo}>
          <img src={logo} alt="logo" />
          Ракета
        </Link>

        <nav className={cl.nav}>
          <ul className={cl.list}>
            {HeaderMenu.map(item => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </nav>

        <Link to={APP_PATH.LOGIN} className={cl.button}>
          Создать магазин
        </Link>
      </div>
    </header>
  )
}
