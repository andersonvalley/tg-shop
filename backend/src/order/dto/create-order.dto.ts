export class CreateOrderDto {
  shopId: string;
  subscriberId: string;
  deliveryId: string;
  paymentId: string;
  promocodeId?: string;
  comment?: string;
  phone: string;
}
