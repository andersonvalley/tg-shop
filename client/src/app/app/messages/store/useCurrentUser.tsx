import { iMessagesByUser } from '@/src/types/messages.interface'
import { create } from 'zustand'

type State = {
  currentUser: iMessagesByUser | null
  setCurrentUser: (payload: iMessagesByUser) => void
}

export const useCurrentUserStore = create<State>(set => ({
  currentUser: null,
  setCurrentUser: payload =>
    set(() => ({
      currentUser: payload,
    })),
}))

// mountStoreDevtool('Store', useUiStore)
