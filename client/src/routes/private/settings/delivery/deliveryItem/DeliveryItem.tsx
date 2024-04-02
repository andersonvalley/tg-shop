import { Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import cl from './delivery.module.scss'

export const DeliveryItem = () => {
  return (
    <li className="card__item">
      <Switch
        className="switch"
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />

      <span className={cl.title}>
        <b>Самовывоз</b>
      </span>

      <p>Адрес самовывоза: ул. Тестовая, д. 1</p>
    </li>
  )
}
