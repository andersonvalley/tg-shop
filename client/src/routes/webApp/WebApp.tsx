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

    console.log(tg)

    return () => {
      script.onload = null
      script.remove()
    }
  }, [])

  return (
    <>
      <Header />
      <main>TgApp</main>
    </>
  )
}
