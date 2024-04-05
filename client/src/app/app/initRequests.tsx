'use client'

import { ReactNode } from 'react'
import { useShop } from './start/useShop'

export interface LayoutProps {
  children: ReactNode
}

export const InitRequests = (props: LayoutProps) => {
  return <>{props.children}</>
}
