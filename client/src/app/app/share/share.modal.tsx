'use client'

import { SubmitButton } from '@/src/components/UI/button/submitButton'
import React, { useState } from 'react'
import { TextArea } from '@/src/components/UI/input/textArea'
import { IShare } from '@/src/types/share.interface'

import styles from './share.module.scss'
import { Checkbox, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import Image from 'next/image'
import { FileType, beforeUpload, getBase64 } from '../../utils/upload'

export interface Props {
  data: IShare
}

export const ShareModal = ({ data }: Props) => {
  const [values, setValues] = useState<IShare>(data)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <form onSubmit={e => submit(e)}>
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
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </div>

      <Checkbox
        checked={values.addButton}
        onChange={e => setValues({ ...values, addButton: e.target.checked })}
      >
        Кнопка «Открыть меню»
      </Checkbox>

      <p className={styles.textModal}>Сообщение получат 1 человек(а)</p>

      <div className="line"></div>
      <SubmitButton>Запустить рассылку</SubmitButton>
    </form>
  )
}
