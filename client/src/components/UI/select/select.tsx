import { Select } from 'antd'

import './select.scss'

interface IOption {
  value: string
  label: string
}

export interface Props {
  label?: string
  width?: string
  defaultValue: string
  options: IOption[]
  margin?: string
  onChange: (event: any) => void
  className?: string
}

export const SelectUi = ({
  width,
  defaultValue,
  options,
  label,
  onChange,
  margin = '20px',
  className,
}: Props) => {
  return (
    <label className="selectLabel" style={{ maxWidth: width, marginBottom: margin }}>
      <span className="labelText">{label}</span>
      <Select className={className} defaultValue={defaultValue} onChange={onChange} options={options} />
    </label>
  )
}
