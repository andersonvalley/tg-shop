import { Navigate } from 'react-router-dom'
import { Landing } from '../public/landing/Landing'
import { Login } from '../public/login/Login'
import { Start } from '../private/start/Start'
import { APP_PATH } from './Paths'

export const privateRoutes = [
  { path: APP_PATH.START, element: <Start /> },
  { path: '*', element: <Navigate to={APP_PATH.START} /> },
]

export const publicRoutes = [
  { path: APP_PATH.MAIN, element: <Landing /> },
  { path: APP_PATH.LOGIN, element: <Login /> },
  { path: '*', element: <Navigate to={APP_PATH.LOGIN} replace /> },
]
