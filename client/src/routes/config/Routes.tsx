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
import { WebApp } from '../webApp/WebApp'
import { Common } from '../private/settings/common/Common'
import { Delivery } from '../private/settings/delivery/Delivery'
import { Payment } from '../private/settings/payment/Payment'
import { Promocodes } from '../private/settings/promocodes/Promocodes'
import { View } from '../private/settings/view/View'
import { Access } from '../private/settings/access/Access'
import { Integrations } from '../private/settings/integration/Integrations'
import { Notifications } from '../private/settings/notifications/Notifications'
import { Tariff } from '../private/settings/tariff/Tariff'

export const privateRoutes = [
  { path: APP_PATH.START, element: <Start /> },
  { path: APP_PATH.CATALOG, element: <Catalog /> },
  { path: APP_PATH.ORDERS, element: <Orders /> },
  { path: APP_PATH.MESSAGE, element: <Messages /> },
  { path: APP_PATH.SUBSCRIBERS, element: <Subscribers /> },
  { path: APP_PATH.SHARE, element: <Share /> },
  { path: APP_PATH.COMMON, element: <Common /> },
  { path: APP_PATH.DELIVERY, element: <Delivery /> },
  { path: APP_PATH.PAYMENT, element: <Payment /> },
  { path: APP_PATH.PROMOCODES, element: <Promocodes /> },
  { path: APP_PATH.VIEW, element: <View /> },
  { path: APP_PATH.ACCESS, element: <Access /> },
  { path: APP_PATH.INTEGRATION, element: <Integrations /> },
  { path: APP_PATH.NOTIFICATIONS, element: <Notifications /> },
  { path: APP_PATH.TARIFF, element: <Tariff /> },
  { path: '*', element: <Navigate to={APP_PATH.START} replace /> },
]

export const publicRoutes = [
  { path: APP_PATH.MAIN, element: <Landing /> },
  { path: APP_PATH.LOGIN, element: <Login /> },
  { path: APP_PATH.SITE, element: <WebApp /> },
  { path: '*', element: <Navigate to={APP_PATH.LOGIN} replace /> },
]
