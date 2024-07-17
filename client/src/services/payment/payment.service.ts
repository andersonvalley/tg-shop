import { instance } from '../api/api.config'
import { deliveryResponse } from '@/src/types/delivery.interface'
import { IPayment, IPaymentResponse } from '@/src/types/payment.interface'

export class PaymentService {
  static async create(data: IPayment) {
    const response = await instance<deliveryResponse>(`/payment/${data.shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<IPayment[]>(`/payment/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: IPayment) {
    const response = await instance<IPaymentResponse>(`/payment/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<IPaymentResponse>(`/payment/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
