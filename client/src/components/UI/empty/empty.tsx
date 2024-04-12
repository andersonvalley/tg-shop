import Image from 'next/image'
import React from 'react'

import empty from '../../../assets/img/empty.png'

export const Empty = () => {
  return (
    <li className="empty">
      <Image src={empty} width={40} height={40} alt="empty" />
      Ничего нет :(
    </li>
  )
}
