'use client'

import { Card } from '@/src/components/UI/card/card'
import { CategoryContentModal } from './category.modal'
import { useModalStore } from '@/src/store/modal.store'
import { ListItem } from '@/src/components/UI/list/listItem'
import { Empty } from '@/src/components/UI/empty/empty'
import { Modal } from 'antd'
import { createPortal } from 'react-dom'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { useGet } from '@/src/hooks/requests/useGet'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { CategoryService } from '@/src/services/category/category.service'
import { SpinUi } from '@/src/components/UI/loader/spin'
import { useDelete } from '@/src/hooks/requests/useDelete'
import { useUpdate } from '@/src/hooks/requests/useUpdate'
import { categoryResponse, createOrUpdateCategory } from '@/src/types/category.interface'
import { CatalogVitrina } from './catalogVitrina'

export const emptyStateCategory = {
  title: '',
}

export const Category = () => {
  const { data, isError, isLoading } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll)
  const { deleteHandler, showConfirmDeleteModal } = useDelete(
    QUERY_KEY.getAllCategories,
    CategoryService.delete
  )

  const { updateHandler, editOption, currentEditItem } = useUpdate<categoryResponse, createOrUpdateCategory>(
    QUERY_KEY.getAllCategories,
    CategoryService.update
  )

  const { setIsConfirmDeleteModal, setIsEditModal, isConfirmDeleteModal, isEditModal } = useModalStore(
    store => store
  )

  return (
    <>
      <Card
        width="30%"
        title="Категории"
        titleModal="Новая категория"
        modalContent={<CategoryContentModal data={emptyStateCategory} />}
        confirmCloseMessage={false}
      >
        <ul>
          {isError && <li className="empty">Ошибка загрузки</li>}
          {isLoading && <SpinUi />}
          {data?.length === 0 && <Empty size={'60px'} />}
          {data?.map((item, index) => {
            return (
              <ListItem
                key={item.id}
                index={index}
                deleteHandler={() => showConfirmDeleteModal(item.id)}
                editHandler={() => editOption(item)}
              >
                {item.title}
              </ListItem>
            )
          })}
        </ul>

        {isConfirmDeleteModal && (
          <Modal
            className="confirm"
            title="Удалить категорию?"
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
              <CategoryContentModal
                updateHandler={updateHandler}
                data={currentEditItem as createOrUpdateCategory}
                update
              />
            </ModalUi>,
            document.body
          )}
      </Card>
      <CatalogVitrina />
    </>
  )
}
