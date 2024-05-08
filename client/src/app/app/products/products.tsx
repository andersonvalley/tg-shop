'use client'

import { Card } from '@/src/components/UI/card/card'
import React, { useEffect, useState } from 'react'
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
import { useShopStore } from '@/src/store/shop.state'
import styles from './products.module.scss'

export const Products = () => {
  const [currentCategory, setCurrentCategory] = useState('Категории не созданы')
  const [currentCategoryId, setCurrentCategoryId] = useState('')
  const { currentShop } = useShopStore()
  const { data: categories, isError, isLoading } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll)
  const { data } = useGet(
    `${QUERY_KEY.getAllGoods}, ${currentCategoryId}`,
    GoodsService.getAll,
    currentShop.id,
    '',
    currentCategoryId,
    '',
    ''
  )

  const { deleteHandler, showConfirmDeleteModal } = useDelete(
    `${QUERY_KEY.getAllGoods}, ${currentCategoryId}`,
    GoodsService.delete
  )
  const { updateHandler, editOption, currentEditItem } = useUpdate<responseMessage, createIGood>(
    `${QUERY_KEY.getAllGoods}, ${currentCategoryId}`,
    GoodsService.update
  )
  const { setIsConfirmDeleteModal, setIsEditModal, isConfirmDeleteModal, isEditModal } = useModalStore(
    store => store
  )

  useEffect(() => {
    if (!categories) return

    if (categories?.length > 0) {
      setCurrentCategoryId(categories[0].id)
    }
  }, [categories, setCurrentCategoryId])

  return (
    <Card
      textButton="Добавить товар"
      width="60%"
      title="Товары"
      titleModal="Новый товар"
      hideButton={!categories?.length}
      modalContent={
        !data ? null : (
          <GoodsContentModal
            currentCategory={currentCategory}
            currentCategoryId={currentCategoryId}
            categories={categories ? categories : []}
            data={data}
          />
        )
      }
      additionally={
        <CategorySelect
          setCurrentCategory={setCurrentCategory}
          setCurrentCategoryId={setCurrentCategoryId}
          categories={categories}
          currentCategory={currentCategory}
        />
      }
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
                {item.discount > 0 && <span className={styles.old}>{normalizePrice(item.price)}</span>}
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
              currentCategory={currentCategory}
              categories={categories ? categories : []}
            />
          </ModalUi>,
          document.body
        )}
    </Card>
  )
}
