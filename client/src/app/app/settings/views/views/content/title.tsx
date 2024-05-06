'use client'

import React, { FormEvent, useState } from 'react'
import Image from 'next/image'

import { useShopStore } from '@/src/store/shop.state'
import '../../views.scss'
import avatar from '../../../../../../assets/1.png'
import { Input } from '@/src/components/UI/input/input'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { ShopService } from '@/src/services/shop/shop.service'
import { IUpdateShopRequest } from '@/src/types/shop.interface'
import { message } from 'antd'

export const Title = () => {
  const { first_name, id } = useShopStore(store => store.currentShop)
  const [value, setValue] = useState(first_name)

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
    mutate({ first_name: value, shopId: id })
  }

  return (
    <div className="section">
      <Image className="img" src={avatar} width={220} height={400} alt="avatar" />
      <form onSubmit={submitHandler} className="form">
        <Input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          label="Название"
          placeholder="Название"
        />
        <SubmitButton>Сохранить</SubmitButton>
        {isSuccess && <span className="updated">Обновится через 10 минут</span>}
      </form>
    </div>
  )
}
