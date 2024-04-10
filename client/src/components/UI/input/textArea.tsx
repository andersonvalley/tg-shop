import { ReactNode } from 'react'
import styles from '../input/input.module.scss'
import { Tooltip } from 'antd'
import { IoIosHelpCircleOutline } from 'react-icons/io'

export interface Props {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  label?: string
  validate?: boolean
  width?: string
  icon?: ReactNode
  labelHelper?: string
}

export const TextArea = ({ placeholder, value, onChange, label, width, icon, labelHelper }: Props) => {
  return (
    <label style={{ maxWidth: width }} className={styles.label}>
      <div className={styles.labelText}>
        {label}{' '}
        {labelHelper && (
          <span className={styles.helper}>
            <Tooltip title={labelHelper}>
              <span className={styles.wrapper}>
                <IoIosHelpCircleOutline />
              </span>
            </Tooltip>
          </span>
        )}
      </div>
      <textarea
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        spellCheck={false}
      />
      <span className={styles.icon}>{icon}</span>
    </label>
  )
}
