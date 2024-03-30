import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { HeaderWithUser } from '../../components/header/HeaderWithUser'
import { useShopAndNavigate } from '../../hooks/useShop'

export function AppLayout() {
  useShopAndNavigate()

  return (
    <>
      <HeaderWithUser />
      <main className="main main__app">
        <Sidebar />
        <section className="main__wrapper">
          <Outlet />
        </section>
      </main>
    </>
  )
}
