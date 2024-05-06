'use client'

import { Card } from '@/src/components/UI/card/card'
import React, { useState } from 'react'
import { GoodsContentModal } from './goods.modal'
import { ListItem } from '@/src/components/UI/list/listItem'
import { Modal } from 'antd'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { useModalStore } from '@/src/store/modal.store'
import { Empty } from '@/src/components/UI/empty/empty'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { GoodsService } from '@/src/services/goods/goods.service'
import { useGet } from '@/src/hooks/requests/useGet'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { useDelete } from '@/src/hooks/requests/useDelete'
import { useUpdate } from '@/src/hooks/requests/useUpdate'
import { createIGood, responseMessage } from '@/src/types/goods.interface'
import { currentPrice, normalizePrice } from '@/src/utils/normalizeCurrency'
import { CategorySelect } from './categorySelect'
import { CategoryService } from '@/src/services/category/category.service'
import styles from './products.module.scss'

export const Products = () => {
  const [currentCategory, setCurrentCategory] = useState('Все')
  const { data: categories } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll)
  const { data, isError, isLoading } = useGet(QUERY_KEY.getAllGoods, GoodsService.getAll)

  const { deleteHandler, showConfirmDeleteModal } = useDelete(QUERY_KEY.getAllGoods, GoodsService.delete)
  const { updateHandler, editOption, currentEditItem } = useUpdate<responseMessage, createIGood>(
    QUERY_KEY.getAllGoods,
    GoodsService.update
  )
  const { setIsConfirmDeleteModal, setIsEditModal, isConfirmDeleteModal, isEditModal } = useModalStore(
    store => store
  )

  return (
    <Card
      textButton="Добавить товар"
      width="60%"
      title="Товары"
      titleModal="Новый товар"
      modalContent={!data ? null : <GoodsContentModal data={data} />}
      additionally={<CategorySelect categories={categories} currentCategory={currentCategory} />}
    >
      <ul className={styles.list}>
        {isError && <li className="empty">Ошибка загрузки</li>}
        {isLoading && <SpinUi />}
        {data?.length === 0 && <Empty />}
        {data?.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              index={index}
              editText="Редактировать"
              deleteHandler={() => showConfirmDeleteModal(item.id)}
              editHandler={() => editOption(item.id)}
            >
              <div className={styles.column}>
                <Image
                  className={styles.photo}
                  src={
                    item.photoLinks[0]?.link
                      ? process.env.NEXT_PUBLIC_PROD + `/products/${item.photoLinks[0]?.link}`
                      : '/nophoto.png'
                  }
                  width={105}
                  height={105}
                  alt={item.title}
                />

                <span className={styles.title}>{item.title}</span>
              </div>

              <div className={styles.priceWrapper}>
                <span className={styles.old}>{normalizePrice(item.price)}</span>
                <span className={styles.new}>{currentPrice(item.price, item.discount)}</span>
              </div>
            </ListItem>
          )
        })}
      </ul>

      {isConfirmDeleteModal && (
        <Modal
          className="confirm"
          title="Удалить товар?"
          open={isConfirmDeleteModal}
          onOk={deleteHandler}
          onCancel={() => setIsConfirmDeleteModal()}
          okText="Удалить"
          cancelText="Оставить"
        ></Modal>
      )}

      {isEditModal &&
        createPortal(
          <ModalUi title="Редактировать" open={isEditModal} setOpen={setIsEditModal}>
            <GoodsContentModal
              updateHandler={updateHandler}
              currentEditId={currentEditItem}
              data={data ? data : []}
              update
            />
          </ModalUi>,
          document.body
        )}
    </Card>
  )
}
