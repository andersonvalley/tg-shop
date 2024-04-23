'use client'

import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'
import { PropsWithChildren, useEffect, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('defer', '')
    script.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js')
    script.onload = () => setIsLoaded(true)
    document.head.append(script)
  }, [])

  return isLoaded ? (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      {children}
    </WebAppProvider>
  ) : (
    <>{children}</>
  )
}
