'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Basic } from './tabs/basic'
import { Options } from './tabs/options'
import { Variants } from './tabs/variants'
import { createOrUpdateIGood, responseMessage } from '@/src/types/goods.interface'
import { useCreate } from '@/src/hooks/requests/useCreate'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { GoodsService } from '@/src/services/goods/goods.service'
import { useGet } from '@/src/hooks/requests/useGet'
import { CategoryService } from '@/src/services/category/category.service'

export interface Props {
  data: createOrUpdateIGood
  update?: boolean
  updateHandler?: (formData: createOrUpdateIGood) => void
}

export const GoodsContentModal = ({ data, update, updateHandler }: Props) => {
  const [values, setValues] = useState<createOrUpdateIGood>(data)
  const { data: categories, isLoading } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll)

  const { createHandler } = useCreate<responseMessage, createOrUpdateIGood>(
    QUERY_KEY.getAllGoods,
    GoodsService.create
  )

  useEffect(() => {
    if (!categories) return

    setValues({ ...values, categoryId: categories[0].id })
  }, [categories])

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
      children: <Basic isLoading={isLoading} categories={categories} values={values} setValues={setValues} />,
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
        <Tabs defaultActiveKey="1" items={items}></Tabs>

        <div className="line"></div>
        <SubmitButton>Добавить товар</SubmitButton>
      </form>
    </>
  )
}
