import { useUpload } from '@/src/hooks/useUpload'
import React from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export const UploadButton = () => {
  const { loading } = useUpload()

  return (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
}
