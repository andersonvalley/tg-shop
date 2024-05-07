import { Users } from './messages'
import { Wrapper } from '@/src/components/UI/layout/wrapper'

import styles from './messages.module.scss'

export default function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Wrapper title="Сообщения">
      <div className={styles.messagesSection}>
        <Users />
        {children}
      </div>
    </Wrapper>
  )
}
