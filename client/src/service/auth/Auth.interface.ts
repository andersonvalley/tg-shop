export interface IUser {
  id: string
  telgramId: string
  firstName?: string
  lastName?: string
  userName?: string
  isPremium?: boolean
  languageCode?: string
  avatarUrl?: string
  code?: null | number
}

export interface ILoginRequest {
  code: number
}

export interface IUserResponseError {
  message: string
}
