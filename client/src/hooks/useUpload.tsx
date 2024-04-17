import { UploadProps } from 'antd'
import { useState } from 'react'
import { FileType, getBase64 } from '../utils/upload'
import { IShare, createShare } from '../types/share.interface'

export const useUpload = (values?: createShare, setValues?: (type: any) => void) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
        if (setValues) setValues({ ...values, photoLink: info.file.response })
      })
    }
  }

  return { handleChange, imageUrl, loading }
}
