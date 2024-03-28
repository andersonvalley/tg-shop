import { Navigate } from 'react-router-dom'
import { Landing } from '../public/landing/Landing'
import { Login } from '../public/login/Login'
import { Start } from '../private/start/Start'
import { APP_PATH } from './Paths'
import { Orders } from '../private/orders/Orders'
import { Catalog } from '../private/catalog/Catalog'
import { Messages } from '../private/messages/Messages'
import { Subscribers } from '../private/subscribers/Subscribers'
import { Share } from '../private/share/Share'
import { Settings } from '../private/settings/Settings'
import { WebApp } from '../webApp/WebApp'

export const privateRoutes = [
  { path: APP_PATH.START, element: <Start /> },
  { path: APP_PATH.CATALOG, element: <Catalog /> },
  { path: APP_PATH.ORDERS, element: <Orders /> },
  { path: APP_PATH.MESSAGE, element: <Messages /> },
  { path: APP_PATH.SUBSCRIBERS, element: <Subscribers /> },
  { path: APP_PATH.SHARE, element: <Share /> },
  { path: APP_PATH.SETTINGS, element: <Settings /> },
  { path: '*', element: <Navigate to={APP_PATH.START} /> },
]

export const publicRoutes = [
  { path: APP_PATH.MAIN, element: <Landing /> },
  { path: APP_PATH.LOGIN, element: <Login /> },
  { path: APP_PATH.SITE, element: <WebApp /> },
  { path: '*', element: <Navigate to={APP_PATH.LOGIN} replace /> },
]
