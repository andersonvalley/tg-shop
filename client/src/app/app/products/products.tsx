'use client'

import { Card } from '@/src/components/UI/card/card'
import React from 'react'
import { GoodsContentModal } from './goods.modal'
import { ListItem } from '@/src/components/UI/list/listItem'
import { Modal } from 'antd'
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
import Image from 'next/image'

import styles from './products.module.scss'
import { normalizePrice } from '@/src/utils/normalizeCurrency'

export const Products = () => {
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
      width="60%"
      title="Товары"
      titleModal="Новый товар"
      modalContent={!data ? null : <GoodsContentModal data={data} />}
    >
      <ul className={styles.list}>
        {isError && <li className="empty">Ошибка загрузки</li>}
        {isLoading && <SpinUi />}
        {data?.length === 0 && <Empty />}
        {data?.map((item, index) => {
          return (
            <ListItem
              editText="Редактировать"
              index={index}
              deleteHandler={() => showConfirmDeleteModal(item.id)}
              editHandler={() => editOption(item.id)}
              key={item.id}
            >
              <div className={styles.column}>
                <Image
                  className={styles.photo}
                  src={
                    item.photoLinks[0]?.link
                      ? process.env.NEXT_PUBLIC_PROD + `/products/${item.photoLinks[0]?.link}`
                      : '/nophoto.png'
                  }
                  width={45}
                  height={45}
                  alt={item.title}
                />

                <span className={styles.title}>{item.title}</span>
              </div>

              {normalizePrice(item.price)}
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
