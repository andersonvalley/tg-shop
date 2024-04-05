export class UserDto {
  telegramId?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  isPremium?: boolean;
  languageCode?: string;
  avatarUrl?: string;
  code?: null | number;
}

export class UserFromRequest {
  user: {
    id: string;
  };
}
