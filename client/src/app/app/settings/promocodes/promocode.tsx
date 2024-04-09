'use client'

import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import React from 'react'
import { ContentModal } from './contentModal'
import { ListItem } from '@/src/components/UI/list/listItem'
import { Modal, Switch } from 'antd'
import { createPortal } from 'react-dom'
import { useGet } from './fetch/useGet'
import { useDelete } from './fetch/useDelete'
import { useUpdate } from './fetch/useUpdate'
import { useModalStore } from '@/src/store/modal.store'
import { ModalUi } from '@/src/components/UI/modal/modal'

export const emptyState = {
  title: '',
  description: '',
  apply: '',
  discount: '',
  discountBy: '',
  orderFrom: '',
  isActive: true,
  order: 0,
  shopId: '',
}

export const Promocodes = () => {
  const { items, updateIsActive, isError } = useGet()
  const { deleteOption, isOkDelete } = useDelete()
  const { editOption, currentEditItem } = useUpdate()
  const { setIsConfirmDeleteModal, setIsEditModal, isConfirmDeleteModal, isEditModal } = useModalStore(
    store => store
  )

  return (
    <Wrapper width="50%" title="Настройки промокодов">
      <Card
        width="50%"
        title="Промокоды"
        modalContent={<ContentModal data={emptyState} />}
        titleModal="Новый промокод"
      >
        <ul>
          {isError && <li className="empty">Ошибка загрузки</li>}
          {items?.length === 0 && <li className="empty">Еще нет промокодов</li>}
          {items?.map(item => {
            return (
              <ListItem
                deleteHandler={() => deleteOption(item)}
                editHandler={() => editOption(item)}
                key={item.id}
              >
                <label className="switch switchMargin">
                  <Switch value={item.isActive} onChange={checked => updateIsActive(checked, item)} />{' '}
                  <span>{item.title}</span>
                </label>

                <p className="description">{item?.description}</p>
              </ListItem>
            )
          })}
        </ul>

        {isConfirmDeleteModal && (
          <Modal
            className="confirm"
            title="Удалить способ оплаты?"
            open={isConfirmDeleteModal}
            onOk={isOkDelete}
            onCancel={() => setIsConfirmDeleteModal()}
            okText="Удалить"
            cancelText="Оставить"
          ></Modal>
        )}

        {isEditModal &&
          createPortal(
            <ModalUi title="Редактировать" open={isEditModal} setOpen={setIsEditModal}>
              <ContentModal data={currentEditItem} update />
            </ModalUi>,
            document.body
          )}
      </Card>
    </Wrapper>
  )
}
