interface IUser {
  id: string
  telegram_id: string
  first_name?: string
  last_name?: string
  user_name?: string
  is_premium?: boolean
  language_code?: string
  avatar_url?: string
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
