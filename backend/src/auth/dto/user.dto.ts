export class UserDto {
  telegram_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  is_premium?: boolean;
  language_code?: string;
  avatar_url?: string;
}

export class UserFromRequest {
  user: {
    id: string;
  };
}
