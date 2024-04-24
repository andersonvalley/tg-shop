'use client'

import React from 'react'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useRouter } from 'next/navigation'

export const Favorite = () => {
  const router = useRouter()

  return (
    <div>
      <BackButton onClick={() => router.back()} />
      favorite
    </div>
  )
}
