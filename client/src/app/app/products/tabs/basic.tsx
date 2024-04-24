import { Input } from '@/src/components/UI/input/input'
import { TextArea } from '@/src/components/UI/input/textArea'
import { SelectUi } from '@/src/components/UI/select/select'
import { useValidate } from '@/src/hooks/useValidate'
import { IGood, createIGood } from '@/src/types/goods.interface'
import { Upload, Image as Imagine } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import type { UploadFile, UploadProps } from 'antd'
import { ICategory } from '@/src/types/category.interface'
import { UploadButton } from '@/src/components/UI/button/uploadButton'

import styles from '../../share/share.module.scss'
import { SpinUi } from '@/src/components/UI/loader/spin'

interface Props {
  state: createIGood
  data: IGood[]
  setValues: (type: createIGood) => void
  categories: ICategory[] | undefined
  isLoading: boolean
  update?: boolean
}

export const Basic = ({ state, setValues, data, categories, isLoading, update }: Props) => {
  const { onChange } = useValidate()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [startEdit, setStartEdit] = useState(false)

  const generateFiles = useMemo((): UploadFile[] => {
    if (!state.photoLinks || state.photoLinks.length === 0 || !update) return []

    return state.photoLinks.map((item, index) => ({
      uid: String(index),
      name: String(index),
      status: 'done',
      url: process.env.NEXT_PUBLIC_PROD + '/products/' + item,
    }))
  }, [state.photoLinks, update])

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (update) setStartEdit(true)

    const successList = newFileList.filter(item => item.status === 'done')
    const oldPhotos = successList.filter(item => !item.response)
    const newPhotos = successList.filter(item => item.response)

    const updatedPhotos = [
      ...newPhotos.map(item => item.response),
      ...oldPhotos.map(item => {
        const url = item.url || ''
        return url.substring(url.indexOf('products/') + 'products/'.length)
      }),
    ]

    setFileList(newFileList)
    setValues({ ...state, photoLinks: updatedPhotos })
  }

  useEffect(() => {
    if (update && !startEdit) setFileList(generateFiles)
  }, [generateFiles, update, startEdit])

  useEffect(() => {
    setValues({ ...state, categoryId: categories ? categories[0].id : '' })
  }, [])

  return (
    <>
      <Input
        label="Название"
        value={state.title}
        onChange={e => setValues({ ...state, title: e.target.value })}
        placeholder=""
      />

      {isLoading ? (
        <SpinUi />
      ) : (
        <SelectUi
          defaultValue={''}
          onChange={value => setValues({ ...state, categoryId: value })}
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
        value={state.description}
        onChange={e => setValues({ ...state, description: e.target.value })}
        placeholder="Скидка 20% на первый заказ"
        required={false}
      />

      <div className="flex">
        <Input
          label="Цена"
          value={String(state.price)}
          onChange={e => onChange(e.target.value, value => setValues({ ...state, price: +value }))}
          placeholder="0"
          width="33%"
          icon="₽"
        />
        <Input
          label="Вес"
          value={state.weight}
          onChange={e => onChange(e.target.value, value => setValues({ ...state, weight: value }))}
          placeholder="0"
          width="33%"
          icon="г"
          required={false}
        />
        <Input
          label="Количество"
          labelHelper="Оставьте поле пустым, если количество товара не ограничено"
          value={state.quantity}
          onChange={e => onChange(e.target.value, value => setValues({ ...state, quantity: value }))}
          placeholder="~"
          width="33%"
          icon="шт"
          required={false}
        />
      </div>

      <Input
        label="Скидка"
        value={String(state.discount)}
        onChange={e => onChange(e.target.value, value => setValues({ ...state, discount: +value }))}
        placeholder="0"
        width="33%"
        icon="₽"
        required={false}
      />

      <Input
        label="Артикул"
        value={state.vendorCode}
        onChange={e => setValues({ ...state, vendorCode: e.target.value })}
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
