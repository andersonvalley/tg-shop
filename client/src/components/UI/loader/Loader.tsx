import { FC } from 'react'
import './loader.scss'

interface Props {
  text?: string
}

export const Loader: FC<Props> = ({ text }) => {
  return (
    <div className="overlay">
      <div className="overlay-wrapper">
        <div className="loader"></div>
        <span className="text">{text}</span>
      </div>
    </div>
  )
}
