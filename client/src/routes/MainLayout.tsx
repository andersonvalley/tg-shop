import { Outlet } from 'react-router-dom'

import '../styles/global.scss'
import '../../node_modules/normalize.css/normalize.css'

export function MainLayout() {
  return <Outlet />
}
