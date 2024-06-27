'use client'

import React, { useState } from 'react'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Input } from '@/src/components/UI/input/input'
import { ICategory, categoryResponse, createOrUpdateCategory } from '@/src/types/category.interface'
import { useCreate } from '@/src/hooks/requests/useCreate'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { CategoryService } from '@/src/services/category/category.service'

export interface Props {
  data: ICategory[]
  update?: boolean
  currentEditId?: string
  updateHandler?: (formData: createOrUpdateCategory) => void
}

export const emptyStateCategory = {
  title: '',
}

export const CategoryContentModal = ({ update, updateHandler, currentEditId }: Props) => {
  const [values, setValues] = useState<createOrUpdateCategory>(emptyStateCategory)
  const { createHandler } = useCreate<categoryResponse, createOrUpdateCategory>(
    QUERY_KEY.getAllCategories,
    CategoryService.create
  )

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (update && updateHandler) {
      values.id = currentEditId
      updateHandler(values)
    } else {
      createHandler(values)
    }
  }

  return (
    <form onSubmit={e => submit(e)}>
      <Input
        label="Название"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder="Хиты продаж"
      />

      <div className="line"></div>
      <SubmitButton>Добавить категорию</SubmitButton>
    </form>
  )
}
