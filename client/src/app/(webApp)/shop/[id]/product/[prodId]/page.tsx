import { Metadata } from 'next'
import { Product } from './product'

export const metadata: Metadata = {
  title: `Интернет магазин | Страница товара`,
}

export default async function ProductPage({ params }: { params: { prodId: string } }) {
  return <Product id={params.prodId} />
}
