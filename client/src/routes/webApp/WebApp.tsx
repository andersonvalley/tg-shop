import { useEffect, useState } from 'react'
import { Header } from './header/Header'

export const WebApp = () => {
  const [tg, setTg] = useState(null)

  useEffect(() => {
    const head = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js')

    const handleScriptLoad = () => {
      if (!window.Telegram) return

      if (typeof window.Telegram.WebApp === 'undefined') {
        console.error('Failed to load Telegram WebApp')
        return
      }

      const tg = window?.Telegram.WebApp
      tg.ready()
      setTg(tg)
    }

    script.onload = handleScriptLoad
    head?.appendChild(script)

    return () => {
      script.onload = null
      script.remove()
    }
  }, [])

  console.log(window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name)

  return (
    <>
      <Header />
      <main>TgApp</main>
      <h1>{window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name}</h1>
      <p>hh</p>
    </>
  )
}
