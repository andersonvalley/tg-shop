import styles from './input.module.scss'

export interface Props {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = props => {
  return (
    <input
      className={styles.input}
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required
      spellCheck={false}
    />
  )
}
