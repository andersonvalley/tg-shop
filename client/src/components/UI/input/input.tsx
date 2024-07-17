import { ReactNode } from 'react'
import styles from './input.module.scss'
import { Tooltip } from 'antd'
import { IoIosHelpCircleOutline } from 'react-icons/io'

export interface Props {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  type?: 'text' | 'number' | 'tel'
  validate?: boolean
  width?: string
  icon?: ReactNode
  required?: boolean
  labelHelper?: string
  className?: string
}

export const Input = ({
  placeholder,
  value,
  onChange,
  label,
  type = 'text',
  required = true,
  width,
  icon,
  labelHelper,
  className,
}: Props) => {
  return (
    <label style={{ maxWidth: width, width: width }} className={[styles.label, className].join(' ')}>
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
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        spellCheck={false}
      />
      <span className={styles.icon}>{icon}</span>
    </label>
  )
}
