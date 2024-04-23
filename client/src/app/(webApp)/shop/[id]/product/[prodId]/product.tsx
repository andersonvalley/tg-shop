'use client'

import { useLocation } from '@/src/app/(webApp)/hooks/useLocation'
import React, { useEffect } from 'react'

export const Product = ({ id }: { id: string }) => {
  const { currentPath, hash } = useLocation()

  return <div>{id}</div>
}
