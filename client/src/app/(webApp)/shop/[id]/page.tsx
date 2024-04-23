import { Metadata } from 'next'
import { Main } from './main'

export const metadata: Metadata = {
  title: `Интернет магазин`,
}

export default async function MainPage({ params }: { params: { id: string } }) {
  return <Main id={params.id} />
}
