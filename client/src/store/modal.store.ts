import { create } from 'zustand'

type State = {
  openModal: boolean
  setToogleModal: () => void

  isConfirmDeleteModal: boolean
  setIsConfirmDeleteModal: () => void

  isEditModal: boolean
  setIsEditModal: () => void
  hideEditModal: () => void

  isOpenDropdown: boolean
  setIsOpenDropdown: () => void

  currentClickIndex: number
  setCurrentClickIndex: (payload: number) => void
}

export const useModalStore = create<State>(set => ({
  openModal: false,

  setToogleModal: () =>
    set(state => ({
      openModal: !state.openModal,
    })),

  isConfirmDeleteModal: false,

  setIsConfirmDeleteModal: () => {
    set(state => ({
      isConfirmDeleteModal: !state.isConfirmDeleteModal,
    }))
  },

  isEditModal: false,
  setIsEditModal: () => {
    set(state => ({
      isEditModal: !state.isEditModal,
    }))
  },
  hideEditModal: () => {
    set(state => ({
      isEditModal: false,
    }))
  },

  isOpenDropdown: false,
  setIsOpenDropdown: () => {
    set(state => ({
      isOpenDropdown: !state.isOpenDropdown,
    }))
  },

  currentClickIndex: -1,
  setCurrentClickIndex: payload => {
    set(() => ({
      currentClickIndex: payload,
    }))
  },
}))

// mountStoreDevtool('Store', useUiStore)
