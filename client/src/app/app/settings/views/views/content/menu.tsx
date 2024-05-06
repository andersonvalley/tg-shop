'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'

import { useShopStore } from '@/src/store/shop.state'
import '../../views.scss'
import avatar from '../../../../../../assets/1.png'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { ShopService } from '@/src/services/shop/shop.service'
import { IUpdateShopRequest } from '@/src/types/shop.interface'
import { TextArea } from '@/src/components/UI/input/textArea'
import { SelectUi } from '@/src/components/UI/select/select'
import { message } from 'antd'

export const Menu = () => {
  const { title_button, id } = useShopStore(store => store.currentShop)
  const [value, setValue] = useState(title_button)

  const client = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationFn: (data: IUpdateShopRequest) => ShopService.update(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ title_button: value, shopId: id })
  }

  return (
    <div className="section">
      <Image className="img" src={avatar} width={220} height={400} alt="avatar" />
      <form onSubmit={submitHandler} className="form">
        <SelectUi
          defaultValue={value}
          onChange={value => setValue(value)}
          options={[
            { value: 'Меню', label: 'Меню' },
            { value: 'Каталог', label: 'Каталог' },
            { value: 'Витрина', label: 'Витрина' },
            { value: 'Услуги', label: 'Услуги' },
          ]}
        />
        <SubmitButton>Сохранить</SubmitButton>
        {isSuccess && <span className="updated">Обновится через 10 минут</span>}
      </form>
    </div>
  )
}
