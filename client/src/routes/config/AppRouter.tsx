import { Route, Routes, useNavigate } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { privateRoutes, publicRoutes } from './Routes'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { AppLayout } from '../private/AppLayout'
import { Loader } from '../../components/UI/loader/Loader'
import { useDelay } from '../../hooks/useDelay'
import { useEffect } from 'react'
import { APP_PATH, DYNAMIC_LINK } from './Paths'
import { useWhichPageToShow } from '../private/start/hooks/useWhichPageToShow'

export const AppRouter = () => {
  const { accessToken } = useCheckAuth()
  const { currentShop } = useWhichPageToShow()
  const navigate = useNavigate()
  const { delay } = useDelay(500)

  useEffect(() => {
    if (location.pathname === APP_PATH.START && currentShop.id) {
      navigate(DYNAMIC_LINK(currentShop.id).CATALOG)
    }
  }, [currentShop])

  if (delay) return <Loader />

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
