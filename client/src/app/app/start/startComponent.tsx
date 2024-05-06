'use client'

import { Card } from '@/src/components/UI/card/card'
import { ShopModal } from './start.modal'
import styles from './start.module.scss'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useShop } from './useShop'
import { normalizeOnlyDate } from '@/src/utils/normalizeDate'
import { useDeleteShop } from './useShopDelete'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'antd'
import { IoWarningOutline } from 'react-icons/io5'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { Empty } from '@/src/components/UI/empty/empty'
import { useShopStore } from '@/src/store/shop.state'
import { IShop } from '@/src/types/shop.interface'
import { PATHS } from '@/src/constants/pages-url.config'
import { useRouter } from 'next/navigation'

export const StartComponent = () => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [currentDeleteId, setCurrentDeleteId] = useState('0')
  const { saveCurrentShop } = useShopStore()
  const { data, isError, isLoading } = useShop()
  const router = useRouter()
  const { deleteById } = useDeleteShop()

  const deleteHandler = (id: string) => {
    setIsConfirmDelete(true)
    setCurrentDeleteId(id)
  }

  const deleteConfirmed = () => {
    setIsConfirmDelete(false)
    deleteById(currentDeleteId)
  }

  const chooseCurrentShop = (e: React.MouseEvent, item: IShop) => {
    const isDeleteButtonClicked = (e.target as HTMLElement).closest(`.${styles.remove}`)
    const isLinkClicked = (e.target as HTMLElement).closest(`.${styles.linkShop}`)

    if (!isDeleteButtonClicked && !isLinkClicked) {
      saveCurrentShop(item)
      router.push(PATHS.CATALOG)
    }
  }

  return (
    <Card
      width="80%"
      title="Магазины"
      textButton="Создать магазин"
      titleModal="Новый магазин"
      modalContent={<ShopModal />}
      confirmCloseMessage={false}
    >
      <ul className={styles.shop}>
        {isError && <li className="empty">Ошибка загрузки</li>}
        {isLoading && <SpinUi />}
        {data?.length === 0 && <Empty />}
        {data?.map(item => {
          return (
            <li onClick={e => chooseCurrentShop(e, item)} key={item.id} className={styles.item}>
              <h3 className={styles.title}>{item.first_name}</h3>

              <div className={styles.block}>
                <span className={styles.text}>Дата создания</span>
                <b>{normalizeOnlyDate(item.created_date)}</b>
              </div>

              <div className={styles.user}>
                <div>
                  <span className={styles.text}>Ссылка</span>
                  <a className={styles.linkShop} target="_blank" href={`https://t.me/${item.username}`}>
                    <b>@{item.username}</b>
                  </a>
                </div>

                <div className={item.is_active ? styles.status : styles.statusOff}>
                  {item.is_active ? 'Активный' : 'Выключен'}
                </div>
              </div>

              <button onClick={() => deleteHandler(item.id)} className={styles.remove}>
                <FaRegTrashCan size={21} />
              </button>
            </li>
          )
        })}
      </ul>

      {isConfirmDelete &&
        createPortal(
          <Modal
            width={700}
            cancelText="Отмена"
            okText="Удалить"
            className="confirm"
            open={isConfirmDelete}
            onOk={deleteConfirmed}
            onCancel={() => setIsConfirmDelete(false)}
          >
            <div className="confirm__content">
              <IoWarningOutline size={36} />
              <h3>Удаление магазина</h3>
              <p>Удалим заказы, подписчиков, товары и интеграции. Восстановить уже не получится.</p>
            </div>
          </Modal>,
          document.body
        )}
    </Card>
  )
}
