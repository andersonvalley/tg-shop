import { IGood, IOption, IVariant } from './goods.interface'

export interface iCart extends IGood {
  id: string
  created_date: string
  variant_id?: string
  options_id?: string
  quantity_cart: number
  goods_id: string
}

export interface createICart {
  subscriber: string
  goods: string
  variant: string
  options: string
  quantity_cart: number
}

export interface updateICart {
  id: string
  quantity_cart: number
}

export interface iCartResponse {
  message: string
}
