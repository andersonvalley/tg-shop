import { ISubscriber } from './subscribers.interface'

export interface iMessagesByUser {
  text: string
  created_date: string
  subscriber: ISubscriber
}

export interface iMessage {
  text: string
  created_date: string
  id: string
  is_from_user: boolean
  subscriber_: ISubscriber
}

export interface iCreateMessage {
  text: string
  shopId: string
  subscriberId: string
}

export interface messageResponse {
  message: 'string'
}
