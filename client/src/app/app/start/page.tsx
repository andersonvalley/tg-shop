import { StartPage } from './Start'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Создать магазин',
}

export default async function Start() {
  return <StartPage />
}
