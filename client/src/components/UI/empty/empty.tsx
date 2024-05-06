import Image from 'next/image'
import React from 'react'

import empty from '../../../assets/img/empty.png'
import { motion } from 'framer-motion'

interface Props {
  size?: string
}

export const Empty = ({ size }: Props) => {
  return (
    <motion.li
      initial={{ transform: 'translateY(10px)', opacity: 0 }}
      whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
      viewport={{ once: true }}
      className="empty"
    >
      <Image style={{ maxWidth: size }} src={empty} width={200} height={200} alt="empty" />
      Еще нет ничего :(
    </motion.li>
  )
}
