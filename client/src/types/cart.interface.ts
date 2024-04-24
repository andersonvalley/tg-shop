import { IGood } from './goods.interface'

export interface iCart extends IGood {
  id: string
  created_date: string
}

export interface createICart {
  subscriber: string
  goods: string
}

export interface iCartResponse {
  message: string
}
