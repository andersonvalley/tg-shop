'use client'

import { Card } from '@/src/components/UI/card/card'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { ListItem } from '@/src/components/UI/list/listItem'
import { ContentModal } from './contentModal'
import { Modal, Switch } from 'antd'
import { useGet } from './fetch/useGet'
import { useDelete } from './fetch/useDelete'
import { createPortal } from 'react-dom'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { useModalStore } from '@/src/store/modal.store'
import { useUpdate } from './fetch/useUpdate'
import { Empty } from '@/src/components/UI/empty/empty'

export const emptyState = {
  title: '',
  description: '',
  price: '',
  priceFrom: '',
  name: false,
  address: false,
  phone: false,
  comment: false,
  isActive: true,
  shopId: '',
  order: 0,
}

export const Delivery = () => {
  const { items, updateIsActive, isError } = useGet()
  const { deleteOption, isOkDelete } = useDelete()
  const { editOption, currentEditItem } = useUpdate()
  const { setIsConfirmDeleteModal, setIsEditModal, isConfirmDeleteModal, isEditModal } = useModalStore(
    store => store
  )

  return (
    <Wrapper width="60%" title="Настройки доставки">
      <Card
        width="60%"
        title="Способы доставки"
        titleModal="Новый способ доставки"
        modalContent={<ContentModal data={emptyState} />}
      >
        <ul>
          {isError && <li className="empty">Ошибка загрузки</li>}
          {items && items?.length === 0 && <Empty />}
          {items?.map((item, index) => {
            return (
              <ListItem
                index={index}
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
