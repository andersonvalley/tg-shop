'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import React, { useState } from 'react'
import { TextArea } from '@/src/components/UI/input/textArea'
import { IShare, createShare } from '@/src/types/share.interface'
import { Checkbox, Upload } from 'antd'
import Image from 'next/image'
import { beforeUpload } from '../../../utils/upload'
import { useUpload } from '@/src/hooks/useUpload'
import { UploadButton } from '@/src/components/UI/button/uploadButton'

import styles from './share.module.scss'
import { useShopStore } from '@/src/store/shop.state'
import { useCreate } from './fetch/useCreate'
export interface Props {
  data: createShare
  subscribers: number
}

export const ShareModal = ({ data, subscribers }: Props) => {
  const [values, setValues] = useState<createShare>(data)
  const { id } = useShopStore(store => store.currentShop)
  const { handleChange, imageUrl } = useUpload(values, setValues)
  const { createShareHandler } = useCreate()

  return (
    <form onSubmit={e => createShareHandler(e, values)}>
      <TextArea
        height="150px"
        value={values.text}
        onChange={e => setValues({ ...values, text: e.target.value })}
        label="Текст сообщения"
        placeholder="Друзья, у нас обновилось летнее меню! Первым 100 покупателям - подарок :)"
      />

      <div className={styles.mb}>
        <span className={styles.label}>Фото:</span>
        <Upload
          accept="image/png, image/jpeg, image/jpg"
          name="sharePhoto"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${process.env.NEXT_PUBLIC_BACKEND}/share/upload/${id}`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <Image src={imageUrl} width={60} height={60} alt="avatar" style={{ width: '100%' }} />
          ) : (
            <UploadButton />
          )}
        </Upload>
      </div>

      <Checkbox
        className={styles.checkbox}
        checked={values.addButton}
        onChange={e => setValues({ ...values, addButton: e.target.checked })}
      >
        Кнопка «Открыть меню»
      </Checkbox>

      <p className={styles.textModal}>Сообщение получат {subscribers} человек(а)</p>

      <div className="line"></div>
      <SubmitButton>Запустить рассылку</SubmitButton>
    </form>
  )
}
