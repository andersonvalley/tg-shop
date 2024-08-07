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
import { useShopStore } from '@/src/store/shop.state'
import { ICategory } from '@/src/types/category.interface'

export interface Props {
  data: IGood[]
  update?: boolean
  currentEditId?: string
  updateHandler?: (formData: createIGood) => void
  currentCategory: string
  currentCategoryId?: string
  categories: ICategory[]
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

export const GoodsContentModal = ({
  data,
  update,
  currentEditId,
  updateHandler,
  currentCategory,
  currentCategoryId,
  categories,
}: Props) => {
  const [values, setValues] = useState<createIGood>(emptyStateGoods)
  const { currentShop } = useShopStore()

  const { createHandler } = useCreate<responseMessage, createIGood>(
    `${QUERY_KEY.getAllGoods}, ${currentCategoryId}`,
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

    if (!currentShop.id) return

    const formattedValues = {
      ...values,
      description: values.description.replace(/\n/g, '<br>'),
    }

    if (update && updateHandler) {
      updateHandler(formattedValues)
    } else {
      createHandler(formattedValues)
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Основное',
      children: (
        <Basic
          update={update}
          currentCategory={currentCategory}
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
