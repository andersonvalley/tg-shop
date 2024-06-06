import React from 'react'
import { HeaderLanding } from '../header/headerLanding'

import { Hero } from './hero/hero'
import { About } from './about/about'
import { Faq } from './faq/faq'
import { Possibilities } from './possibilities/Possibilities'

export const MainPage = () => {
  return (
    <>
      <HeaderLanding />
      <main className="main">
        <Hero />
        <About />
        <Possibilities />
        <Faq />
      </main>
    </>
  )
}
