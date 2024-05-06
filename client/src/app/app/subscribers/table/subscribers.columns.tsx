import { ISubscriber } from '@/src/types/subscribers.interface'
import { normalizeOnlyDate } from '@/src/utils/normalizeDate'
import { TableProps } from 'antd'
import Image from 'next/image'

import styles from '../subscribers.module.scss'

export const columns: TableProps<ISubscriber>['columns'] = [
  {
    title: 'Номер',
    dataIndex: 'id',
    key: 'id',
    render: (_, record, index) => <>#{index + 1}</>,
  },
  {
    title: 'Имя',
    dataIndex: 'first_name',
    key: 'first_name',
    render: (_, record) => (
      <div className={styles.avatarWr}>
        <Image
          className={styles.avatar}
          src={record.avatar_url ? record.avatar_url : '/user.png'}
          height={50}
          width={50}
          alt="avatar"
        />
        <span>{record.first_name}</span>
      </div>
    ),
  },
  {
    title: 'Юзернейм',
    dataIndex: 'username',
    key: 'username',
    render: (_, record) => <>@{record.username}</>,
  },
  {
    title: 'Дата подписки',
    dataIndex: 'created_date',
    key: 'created_date',
    render: (_, record) => <>{normalizeOnlyDate(String(record.created_date))}</>,
  },
]
