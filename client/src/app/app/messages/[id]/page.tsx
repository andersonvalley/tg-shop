import { Metadata } from 'next'
import { MessagesById } from './messagesById'

export const metadata: Metadata = {
  title: 'Сообщения',
}

export default function MessagesByIdPage() {
  return <MessagesById />
}
