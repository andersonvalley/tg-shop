import { Metadata } from 'next'
import { Cart } from './cart'

export const metadata: Metadata = {
  title: `Интернет магазин | Корзина`,
}

export default function CartPage() {
  return <Cart />
}
