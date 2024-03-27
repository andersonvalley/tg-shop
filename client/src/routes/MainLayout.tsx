import { Outlet } from 'react-router-dom'

import '../styles/global.scss'
import '../../node_modules/normalize.css/normalize.css'
import { Header } from '../components/header/Header'

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}
