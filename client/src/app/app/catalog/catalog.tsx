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
    <>
      <h1 className="title">Товары</h1>
      <div className="line"></div>

      <div className={styles.cardWrapper}>
        <div className={[styles.cardCategory, 'card', 'animate'].join(' ')}>
          <div className={styles.cardInner}>
            <div className="card__header">
              <span>Категории</span>{' '}
              <button onClick={() => setOpenModalToAddCategory(true)} className="button-add">
                <FiPlus size={23} />
              </button>
            </div>
            {/* Добавить категорию */}
            {openModalToAddCategory && (
              <ModalUi
                open={openModalToAddCategory}
                setOpen={setOpenModalToAddCategory}
                title="Новая категория"
                setValue={setValue}
              >
                <form onSubmit={addCategoryHandler}>
                  <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Название" />
                  <SubmitButton type="submit">Добавить категорию</SubmitButton>
                </form>
              </ModalUi>
            )}

            {renameModal && (
              <ModalUi
                open={renameModal}
                setOpen={setToogleRenameModal}
                title="Изменить категорию"
                setValue={setCurrentCategoryTitle}
              >
                <form onSubmit={renameCategorySubmit}>
                  <Input
                    value={currentCategoryTitle}
                    onChange={e => setCurrentCategoryTitle(e.target.value)}
                    placeholder="Название"
                  />
                  <SubmitButton type="submit">Сохранить</SubmitButton>
                </form>
              </ModalUi>
            )}

            <Category
              categories={categories}
              activeCategory={activeCategory}
              onClick={clickHandler}
              changeCategory={changeCategory}
            />
          </div>
        </div>

        <div className={[styles.cardGoods, 'card'].join(' ')}>
          <div className={styles.cardInner}>
            <div className="card__header">
              <span>Товары</span>
              <button className="button-add button-add__good">
                <FiPlus size={23} /> Добавить товар
              </button>
            </div>

            {/* <Goods
              goods={goods}
              activeGoods={activeCategory}
              onClick={clickHandler}
              changeGoods={changeCategory}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
