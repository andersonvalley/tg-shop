import { stringify } from 'querystring'

export interface IPromocode {
  title: string
  description: string
  apply: string
  discount: string
  discountBy: string
  orderFrom: string
  isActive: boolean
  order: number
  id?: string
  createdDate?: string
  updatedDate?: string
  shopId?: string
}

export interface promocodeResponse {
  message: string
}

export interface validatePromocode {
  promocode: string
  shopId: string
  subscriberId: string
  sum: number
}

export interface PromocodeValidateResponse {
  discount: string
  discountBy: string
  orderFrom: string
  apply: string
}
