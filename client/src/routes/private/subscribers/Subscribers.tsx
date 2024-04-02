import { Link } from 'react-router-dom'
import { Alert } from '../../../components/UI/alert/Alert'
import { DYNAMIC_LINK } from '../../config/Paths'
import { useShopStore } from '../../../store/shop.state'

import cl from './subscribers.module.scss'
import { Table } from 'antd'

export const Subscribers = () => {
  const { id } = useShopStore(store => store.currentShop)

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]

  const columns = [
    {
      title: 'НОМЕР',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ИМЯ',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'ЮЗЕРНЕЙМ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'ДАТА ПОДПИСКИ',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <>
      <h1 className="title">Подписчики</h1>
      <div className="line"></div>

      <Alert local="subscribers">
        <p>
          <b>Подписчики</b> — это люди, которые зашли в ваш магазин. Теперь их данные хранятся здесь, а вы
          можете отправлять им{' '}
          <Link className={cl.link} to={DYNAMIC_LINK(id).SHARE}>
            рассылки
          </Link>{' '}
          👌
        </p>
      </Alert>

      <div className={['card', 'card__full', 'animate', 'animate-min'].join(' ')}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  )
}
