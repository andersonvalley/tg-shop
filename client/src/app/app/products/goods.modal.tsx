'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Basic } from './tabs/basic'
import { Options } from './tabs/options'
import { Variants } from './tabs/variants'
import { IGood, createIGood, responseMessage } from '@/src/types/goods.interface'
import { useCreate } from '@/src/hooks/requests/useCreate'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { GoodsService } from '@/src/services/goods/goods.service'
import { useGet } from '@/src/hooks/requests/useGet'
import { CategoryService } from '@/src/services/category/category.service'

export interface Props {
  data: IGood[]
  update?: boolean
  currentEditId?: string
  updateHandler?: (formData: createIGood) => void
}

export const emptyStateGoods: createIGood = {
  title: '',
  description: '',
  price: '',
  discount: 0,
  weight: '',
  quantity: '',
  vendorCode: '',
  shopId: '',
  categoryId: '',
  photoLinks: [],
  titleOption: '',
  requiredOption: false,
  titleVariant: '',
  variants: [
    {
      title: '',
      price: '',
      id: '1',
      weight: '',
      vendorCode: '',
      quantity: '',
    },
  ],
  options: [
    {
      title: '',
      price: '',
      id: '1',
    },
  ],
}

export const GoodsContentModal = ({ data, update, currentEditId, updateHandler }: Props) => {
  const [values, setValues] = useState<createIGood>(emptyStateGoods)
  const { data: categories, isLoading } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll)

  const { createHandler } = useCreate<responseMessage, createIGood>(
    QUERY_KEY.getAllGoods,
    GoodsService.create
  )

  const currentEdit = data.find(item => item.id === currentEditId)

  useEffect(() => {
    if (!currentEdit) return
    const { createdDate, updatedDate, category, photoLinks, ...rest } = currentEdit

    const data = {
      ...rest,
      shopId: '',
      categoryId: category.id,
      photoLinks: photoLinks.map(item => item.link),
    }
    setValues(data)
  }, [currentEdit])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (update && updateHandler) {
      updateHandler(values)
    } else {
      createHandler(values)
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Основное',
      children: (
        <Basic
          update={update}
          isLoading={isLoading}
          categories={categories}
          state={values}
          setValues={setValues}
        />
      ),
    },
    {
      key: '2',
      label: 'Варианты',
      children: <Variants values={values} setValues={setValues} />,
    },
    {
      key: '3',
      label: 'Опции',
      children: <Options values={values} setValues={setValues} />,
    },
  ]

  return (
    <>
      <form onSubmit={submit}>
        <Tabs defaultActiveKey="0" items={items}></Tabs>

        <div className="line"></div>
        <SubmitButton>{update ? 'Сохранить' : 'Добавить товар'}</SubmitButton>
      </form>
    </>
  )
}
