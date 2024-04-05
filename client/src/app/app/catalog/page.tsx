'use client'

import { useCategoryUiStore } from '@/src/store/useCategoryUi'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useRenameCategory } from './category/useRenameCategory'
import { useCreteCategory } from './category/useCreteCategory'
import { useDragCategory } from './category/useDragCategory'
import styles from './catalog.module.scss'
import { Input } from '@/src/components/UI/input/input'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import Category from './category/category'
import { Goods } from './goods/goods'
import { ModalUi } from '@/src/components/UI/modal/modal'
import { useCategory } from './category/useCategory'
import { Wrapper } from '@/src/components/UI/layout/wrapper'
import { Card } from '@/src/components/UI/card/card'

export default function Catalog() {
  const [openModalToAddCategory, setOpenModalToAddCategory] = useState(false)
  const { categories, saveCategories } = useCategory()
  // const { goods } = useGoods()
  const { clickHandler, changeCategory, activeCategory } = useDragCategory({ saveCategories, categories })
  const { addCategoryHandler, value, setValue } = useCreteCategory({ setOpenModalToAddCategory })

  const { renameCategorySubmit } = useRenameCategory()
  const { renameModal, setToogleRenameModal, currentCategoryTitle, setCurrentCategoryTitle } =
    useCategoryUiStore(store => store)

  return (
    <Wrapper width="86%" title="Товары">
      <div className={styles.cardWrapper}>
        <Card width="25%" title="Категории">
          ul
        </Card>
        <Card width="60%" title="Товары">
          ul
        </Card>
      </div>
    </Wrapper>
  )
}
