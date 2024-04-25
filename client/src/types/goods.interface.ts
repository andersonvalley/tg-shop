import { ICategory } from './category.interface'

interface IFiles {
  id: string
  link: string
}

interface IOption {
  id: string
  title: string
  price: string
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

  titleOption: string
  requiredOption: boolean
  options: IOption[]
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

  titleOption: string
  requiredOption: boolean
  options: IOption[]
}
export interface responseMessage {
  message: string
}
