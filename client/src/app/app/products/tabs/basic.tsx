import { Input } from '@/src/components/UI/input/input'
import { TextArea } from '@/src/components/UI/input/textArea'
import { SelectUi } from '@/src/components/UI/select/select'
import { useValidate } from '@/src/hooks/useValidate'
import { createOrUpdateIGood } from '@/src/types/goods.interface'
import { Upload, Image as Imagine } from 'antd'
import React, { useEffect, useState } from 'react'
import type { UploadFile, UploadProps } from 'antd'
import { ICategory } from '@/src/types/category.interface'
import { UploadButton } from '@/src/components/UI/button/uploadButton'

import styles from '../../share/share.module.scss'
import { SpinUi } from '@/src/components/UI/loader/spin'

interface Props {
  values: createOrUpdateIGood
  setValues: (type: createOrUpdateIGood) => void
  categories: ICategory[] | undefined
  isLoading: boolean
}

export const Basic = ({ values, setValues, categories, isLoading }: Props) => {
  const { onChange } = useValidate()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  // console.log(
  //   values.photoLinks.map(item => ({
  //     uui: item.id,
  //     name: item.photoLink,
  //     url: 'http://localhost:5501/api/uploads/products/' + item.photoLink,
  //   }))
  // )

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setValues({ ...values, linksOfPhoto: newFileList.map(item => item.response) })
  }

  return (
    <>
      <Input
        label="Название"
        value={values.title}
        onChange={e => setValues({ ...values, title: e.target.value })}
        placeholder=""
      />

      {isLoading ? (
        <SpinUi />
      ) : (
        <SelectUi
          defaultValue={categories ? categories[0].title : ''}
          onChange={value => setValues({ ...values, categoryId: value })}
          label="Категория"
          options={
            categories
              ? categories?.map(option => ({
                  value: option.id,
                  label: option.title,
                }))
              : []
          }
        />
      )}

      <TextArea
        label="Описание"
        value={values.description}
        onChange={e => setValues({ ...values, description: e.target.value })}
        placeholder="Скидка 20% на первый заказ"
        required={false}
      />

      <div className="flex">
        <Input
          label="Цена"
          value={values.price}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, price: value }))}
          placeholder="0"
          width="33%"
          icon="₽"
        />
        <Input
          label="Вес"
          value={values.weight}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, weight: value }))}
          placeholder="0"
          width="33%"
          icon="г"
          required={false}
        />
        <Input
          label="Количество"
          labelHelper="Оставьте поле пустым, если количество товара не ограничено"
          value={values.quantity}
          onChange={e => onChange(e.target.value, value => setValues({ ...values, quantity: value }))}
          placeholder="~"
          width="33%"
          icon="шт"
          required={false}
        />
      </div>

      <Input
        label="Артикул"
        value={values.vendorCode}
        onChange={e => setValues({ ...values, vendorCode: e.target.value })}
        placeholder=""
        width="40%"
        required={false}
      />

      <div className={styles.mb}>
        <span className={styles.label}>Фото:</span>

        <Upload
          accept="image/png, image/jpeg, image/jpg"
          action={`${process.env.NEXT_PUBLIC_BACKEND}/goods/upload`}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 5 ? null : <UploadButton />}
        </Upload>
        {previewImage && (
          <Imagine
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </div>
    </>
  )
}
