import cl from './catalog.module.scss'
import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { ModalUi } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import { useCategory } from './hooks/useCategory'
import { useGoods } from './hooks/useGoods'
import { useDragCategory } from './hooks/useDragCategory'
import { useCreteCategory } from './hooks/useCreteCategory'
import { Goods } from './goods/Goods'
import { Category } from './category/Category'
import { useRenameCategory } from './hooks/useRenameCategory'
import { useCategoryUiStore } from '../../../store/useCategoryUi'

export const Catalog = () => {
  const [openModalToAddCategory, setOpenModalToAddCategory] = useState(false)
  const { categories, saveCategories } = useCategory()
  const { goods } = useGoods()
  const { clickHandler, changeCategory, activeCategory } = useDragCategory({ saveCategories, categories })
  const { addCategoryHandler, value, setValue } = useCreteCategory({ setOpenModalToAddCategory })

  const { renameCategorySubmit } = useRenameCategory()
  const { renameModal, setToogleRenameModal, currentCategoryTitle, setCurrentCategoryTitle } =
    useCategoryUiStore(store => store)

  return (
    <>
      <h1 className="title">Товары</h1>
      <div className="line"></div>

      <div className={cl.cardWrapper}>
        <div className={[cl.cardCategory, 'card', 'animate'].join(' ')}>
          <div className={cl.cardInner}>
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
                  <Button type="submit">Добавить категорию</Button>
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
                  <Button type="submit">Сохранить</Button>
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

        <div className={[cl.cardGoods, 'card'].join(' ')}>
          <div className={cl.cardInner}>
            <div className="card__header">
              <span>Товары</span>
              <button className="button-add button-add__good">
                <FiPlus size={23} /> Добавить товар
              </button>
            </div>

            <Goods
              goods={goods}
              activeGoods={activeCategory}
              onClick={clickHandler}
              changeGoods={changeCategory}
            />
          </div>
        </div>
      </div>
    </>
  )
}
