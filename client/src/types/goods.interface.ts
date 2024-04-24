import { ICategory } from './category.interface'

interface IFiles {
  id: string
  link: string
}

export interface IGood {
  id: string
  createdDate: string
  updatedDate: string
  title: string
  description: string
  price: number
  discount: number
  weight: string
  quantity: string
  vendorCode: string
  category: ICategory
  photoLinks: IFiles[]
}
export interface createIGood {
  id?: string
  title: string
  description: string
  price: number | string
  discount: number | string
  weight: string
  quantity: string
  vendorCode: string
  shopId: string
  categoryId: string
  photoLinks: string[]
}
export interface responseMessage {
  message: string
}
