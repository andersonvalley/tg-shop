interface IUser {
  id: string
  telegramId: string
  firstName?: string
  lastName?: string
  userName?: string
  isPremium?: boolean
  languageCode?: string
  avatarUrl?: string
  code?: null | number
}

export interface IUserResponse {
  accessToken: string
  user: IUser
}

export interface ILoginRequest {
  code: number
}

export interface IUserResponseError {
  message: string
}
