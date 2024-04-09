export interface IDelivery {
  title: string
  description: string
  price: string
  priceFrom: string
  isActive: boolean
  order: number
  name: boolean
  address: boolean
  phone: boolean
  comment: boolean
  id?: string
  createdDate?: string
  updatedDate?: string
  shopId?: string
}

export interface deliveryResponse {
  message: string
}
