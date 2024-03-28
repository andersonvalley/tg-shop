import { Link } from 'react-router-dom'
import { APP_PATH } from '../../routes/config/Paths'

import cl from './sidebar.module.scss'
import logo from '../../assets/img/logo.png'
import { Menu } from './Menu.data'

export const Sidebar = () => {
  return (
    <aside className={cl.sidebar}>
      <Link to={APP_PATH.MAIN} className={cl.logo}>
        <img src={logo} alt="logo" />
        Ракета
      </Link>

      <nav className={cl.nav}>
        <ul className={cl.menu}>
          {Menu.map(item => {
            return (
              <li key={item.title} className={cl.item}>
                <Link className={cl.link} to={item.link}>
                  {item.icon} <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
