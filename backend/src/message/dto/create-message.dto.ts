export class CreateMessageDto {
  text: string;
  shopId: string;
  subscriberId: string;
  is_from_user: boolean;
}

export class getMessageDto {
  shopId: string;
  subscriberId: string;
}
