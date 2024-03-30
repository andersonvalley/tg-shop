import { create } from 'zustand'
import { IUserResponse } from '../service/auth/Auth.interface'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type Action = {
  saveUser: (userData: IUserResponse & { accessToken?: string }) => void
  deleteAllUser: () => void
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
  deleteAllUser: () =>
    set(() => ({
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
    })),
}))

mountStoreDevtool('Store', useUserStore)
