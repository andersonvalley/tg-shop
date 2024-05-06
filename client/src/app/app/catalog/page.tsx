import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Metadata } from 'next'
import { Category } from './category'

export const metadata: Metadata = {
  title: 'Категории',
}

export default function CatalogPage() {
  return (
    <Wrapper width="30%" title="Категории">
      <Category />
    </Wrapper>
  )
}
