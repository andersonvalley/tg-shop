import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { privateRoutes, publicRoutes } from './Routes'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { AppLayout } from '../private/AppLayout'
import { Loader } from '../../components/UI/loader/Loader'
import { useDelay } from '../../hooks/useDelay'

export const AppRouter = () => {
  const { status, accessToken } = useCheckAuth()
  const { delay } = useDelay(100)

  if (delay) return <Loader />
  if (status === 'error' && accessToken) return 'Error'

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
