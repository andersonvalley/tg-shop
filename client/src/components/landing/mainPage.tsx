import React from 'react'
import { HeaderLanding } from '../header/headerLanding'

import { Hero } from './hero/hero'
import { About } from './about/about'

export const MainPage = () => {
  return (
    <>
      <HeaderLanding />
      <main className="main">
        <Hero />
        <About />
      </main>
    </>
  )
}
