import { useState, useEffect } from 'react'
import useHash from './useHash'

export const usePathname = () => {
  const [initialPathname, setInitialPathname] = useState<null | string>(null)
  const hash = useHash()

  useEffect(() => {
    const currentPathname = window.location.pathname

    if (!localStorage.getItem('initialPathname')) {
      localStorage.setItem('initialPathname', currentPathname)
      setInitialPathname(currentPathname)
    } else {
      setInitialPathname(localStorage.getItem('initialPathname'))
    }
  }, [])

  return { initialPathname, hash }
}
