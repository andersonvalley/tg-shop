import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
  width?: string
  danger?: boolean
  hideButton?: boolean
  textButton?: string
  onClickButton?: () => void
}

import styles from './card.module.scss'
import { FiPlus } from 'react-icons/fi'

export const Card = ({ children, title, textButton, onClickButton, width, hideButton, danger }: Props) => {
  const dangerCl = danger ? styles.danger : ''

  return (
    <div style={{ maxWidth: width }} className={[styles.card, dangerCl, 'card', 'animate'].join(' ')}>
      <div className={styles.cardHeader}>
        <span>{title}</span>{' '}
        {hideButton ? null : (
          <button onClick={onClickButton} className="button-add">
            <FiPlus size={23} /> {textButton}
          </button>
        )}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  )
}
