export interface IPayment {
  title: string
  isActive: boolean
  id?: string
  createdDate?: string
  updatedDate?: string
  shopId?: string
}

export interface IPaymentResponse {
  message: string
}
