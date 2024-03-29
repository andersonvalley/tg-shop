import { useEffect, useState } from 'react'

export const useDelay = (ms: number) => {
  const [delay, setDelay] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(false)
    }, ms)

    return () => clearTimeout(timer)
  }, [ms])

  return { delay }
}
