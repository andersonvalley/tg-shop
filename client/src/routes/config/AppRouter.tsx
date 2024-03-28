import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { privateRoutes, publicRoutes } from './Routes'
import { useUserStore } from '../../store/user.state'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { AppLayout } from '../private/AppLayout'

export const AppRouter = () => {
  const { accessToken } = useUserStore(store => store)
  const { isLoading } = useCheckAuth()

  if (isLoading) {
    return <h1>Загрузка</h1>
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {accessToken ? (
          <Route element={<AppLayout />}>
            {privateRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Route>
        ) : (
          publicRoutes.map(route => <Route key={route.path} {...route} />)
        )}
      </Route>
    </Routes>
  )
}
