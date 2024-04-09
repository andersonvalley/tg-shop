import { RxCursorText } from 'react-icons/rx'
import { MdOutlineDelete } from 'react-icons/md'

import cl from '../catalog.module.scss'
import React, { ReactNode } from 'react'
import { useDeleteCategory } from './useDeleteCategory'
import { useRenameCategory } from './useRenameCategory'
import { ButtonMenu } from '@/src/components/UI/button/buttonMenu'
import { ICategory } from '@/src/types/category.interface'

interface Props {
  value?: ICategory
}

export const ContentDropdown: React.FC<Props> = ({ value }): ReactNode => {
  const { deleteCategoryHandler } = useDeleteCategory()
  const { renameCategoryHandler } = useRenameCategory()

  return (
    <div className={cl.group}>
      <ButtonMenu onClick={() => renameCategoryHandler()}>
        <RxCursorText size={18} /> Переименовать
      </ButtonMenu>
      <ButtonMenu onClick={() => deleteCategoryHandler()} danger>
        <MdOutlineDelete size={18} /> Удалить
      </ButtonMenu>
    </div>
  )
}
