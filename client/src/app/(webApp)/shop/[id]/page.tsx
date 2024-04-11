import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Интернет магазин`,
}

export default async function WebApp({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  console.log(data)

  return <h1>{params.id}</h1>
}

async function getData(id: string) {
  const res = await fetch(`http://localhost:5501/api/delivery/${id}`, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
