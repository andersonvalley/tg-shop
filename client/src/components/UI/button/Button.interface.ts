export interface IButton {
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
