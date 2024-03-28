import { create } from 'zustand'
import { IUserResponse } from '../service/auth/Auth.interface'

type Action = {
  saveUser: (userData: IUserResponse & { accessToken?: string }) => void
}

export const useUserStore = create<IUserResponse & Action>(set => ({
  accessToken: '',
  user: {
    id: '',
    telegramId: '',
    firstName: '',
    lastName: '',
    userName: '',
    isPremium: false,
    languageCode: '',
    avatarUrl: '',
    code: null,
  },
  saveUser: userData =>
    set(state => ({
      accessToken: userData.accessToken || state.accessToken,
      user: { ...state.user, ...userData.user },
    })),
}))
