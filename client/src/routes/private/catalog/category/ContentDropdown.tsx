import { RxCursorText } from 'react-icons/rx'
import { ButtonMenu } from '../../../../components/UI/button/ButtonMenu'
import { MdOutlineDelete } from 'react-icons/md'

import cl from '../catalog.module.scss'
import { ICategory } from '../../../../service/category/category.interface'
import React, { ReactNode } from 'react'
import { useDeleteCategory } from '../hooks/useDeleteCategory'
import { useRenameCategory } from '../hooks/useRenameCategory'

interface Props {
  value: ICategory
}

export const ContentDropdown: React.FC<Props> = ({ value }): ReactNode => {
  const { deleteCategoryHandler } = useDeleteCategory()
  const { renameCategoryHandler } = useRenameCategory()

  return (
    <div className={cl.group}>
      <ButtonMenu onClick={() => renameCategoryHandler()}>
        <RxCursorText size={18} /> Переименовать
      </ButtonMenu>
      <ButtonMenu onClick={() => deleteCategoryHandler(value)} danger>
        <MdOutlineDelete size={18} /> Удалить
      </ButtonMenu>
    </div>
  )
}
