interface Photo {
  id: string
  photoLink: string
  url?: string
  uui?: string
  name?: string
}

export interface IGood {
  id: string
  createdDate: string
  updatedDate: string
  title: string
  description: string
  price: number
  weight: string
  quantity: string
  vendorCode: string
  shopId?: string
  photoLinks: Photo[]
  categoryId?: string
}
export interface createOrUpdateIGood {
  id?: string
  createdDate?: string
  updatedDate?: string
  title: string
  description: string
  price: number
  weight: string
  quantity: string
  vendorCode: string
  shopId?: string
  categoryId?: string
  linksOfPhoto?: string[]
  photoLinks?: Photo[]
}

export interface responseMessage {
  message: string
}
