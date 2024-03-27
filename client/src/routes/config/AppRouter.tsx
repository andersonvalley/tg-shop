import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { privateRoutes, publicRoutes } from './Routes'

export const AppRouter = () => {
  const isAuth = false
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {isAuth
          ? privateRoutes.map(route => <Route key={route.path} {...route} />)
          : publicRoutes.map(route => <Route key={route.path} {...route} />)}
      </Route>
    </Routes>
  )
}
