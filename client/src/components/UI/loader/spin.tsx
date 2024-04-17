import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export const SpinUi = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  )
}
