export interface IShare {
  id?: string
  createdDate?: string
  text: string
  photoLink?: string
  addButton: boolean
}

export interface shareResponse {
  message: string
}

export interface createShare {
  text: string
  photoLink?: string
  addButton: boolean
  shopId?: string
}

export interface uploadImage {
  sharePhoto: string
  shopId: string
}
