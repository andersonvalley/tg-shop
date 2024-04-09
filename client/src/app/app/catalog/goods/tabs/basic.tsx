import { Input } from '@/src/components/UI/input/input'
import { SelectUi } from '@/src/components/UI/select/select'
import { useValidate } from '@/src/hooks/useValidate'
import React from 'react'

interface Props {
  values: any
  setValues: (type: any) => void
}

export const Basic = ({ values, setValues }: Props) => {
  const { onChange } = useValidate()

  return (
    <>
      <Input
        label="Название"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder="SALE10"
      />

      <SelectUi
        defaultValue="first"
        onChange={value => setValues({ ...values, apply: value })}
        label="Категория"
        options={[
          { value: 'first', label: 'Только к первому заказу' },
          { value: 'all', label: 'Без ограничений' },
        ]}
      />

      <Input
        label="Описание"
        labelHelper="Будет видно только вам"
        value={values.description}
        onChange={e => setValues({ ...values, description: e.target.value })}
        placeholder="Скидка 20% на первый заказ"
      />

      <div className="flex">
        <Input
          label="Цена"
          value={values.priceFrom}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
          placeholder="0"
          width="33%"
          icon="₽"
        />
        <Input
          label="Вес"
          value={values.priceFrom}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
          placeholder="0"
          width="33%"
          icon="г"
        />
        <Input
          label="Количество"
          labelHelper="Оставьте поле пустым, если количество товара не ограничено"
          value={values.priceFrom}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
          placeholder="~"
          width="33%"
          icon="шт"
        />
      </div>

      <Input
        label="Артикул"
        value={values.priceFrom}
        onChange={e => onChange(e.target.value, value => setValues({ ...values, priceFrom: value }))}
        placeholder=""
        width="40%"
      />
    </>
  )
}
