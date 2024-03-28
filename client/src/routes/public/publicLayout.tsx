import { Outlet } from 'react-router-dom'

import { Header } from '../../components/header/Header'

export function PuclicLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}
