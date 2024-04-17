import Image from 'next/image'
import React from 'react'

import empty from '../../../assets/img/empty.png'

interface Props {
  size?: string
}

export const Empty = ({ size }: Props) => {
  return (
    <li className="empty">
      <Image style={{ maxWidth: size }} src={empty} width={40} height={40} alt="empty" />
      Ничего нет :(
    </li>
  )
}
