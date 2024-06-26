'use client'

import Link from 'next/link'
import Image from 'next/image'

import { HeaderMenu } from './header.menu'
import { PATHS } from '@/src/constants/pages-url.config'

import cl from './header.module.scss'
import { LinkLanding } from '../landing/link/link'
import { useRouter } from 'next/navigation'

export const HeaderLanding = () => {
  const router = useRouter()
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault()

    const scrollEl = document.getElementById(id)

    if (!scrollEl) {
      router.push('/')

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } else {
      scrollEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header className={cl.header}>
      <div className={cl.wrapperLanding}>
        <div className={cl.burger}>
          <div className={cl.line}></div>
        </div>
        <Link scroll={false} href={PATHS.MAIN} className={cl.logo}>
          <Image src="/logo.png" width={100} height={40} alt="logo" />
          Ракета
        </Link>

        <nav className={cl.nav}>
          <ul className={cl.list}>
            {HeaderMenu.map(item => (
              <li key={item.name}>
                <button onClick={e => scrollTo(e, item.id)}>{item.name}</button>
              </li>
            ))}
          </ul>
        </nav>

        <LinkLanding path={PATHS.LOGIN} text="Создать магазин" />
      </div>
    </header>
  )
}
