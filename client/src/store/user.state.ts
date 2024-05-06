import { create } from 'zustand'
import { IUserResponse } from '../types/auth.interface'

type Action = {
  saveUser: (userData: IUserResponse & { accessToken?: string }) => void
  deleteAllUser: () => void
}

export const useUserStore = create<IUserResponse & Action>(set => ({
  accessToken: '',
  user: {
    id: '',
    telegram_id: '',
    first_name: '',
    last_name: '',
    username: '',
    is_premium: false,
    language_code: '',
    avatar_url: '',
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
        telegram_id: '',
        first_name: '',
        last_name: '',
        user_name: '',
        is_premium: false,
        language_code: '',
        avatar_url: '',
      },
    })),
}))

// mountStoreDevtool('Store', useUserStore)
