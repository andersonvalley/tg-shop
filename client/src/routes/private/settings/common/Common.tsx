import { Button } from '../../../../components/UI/button/Button'
import { useShopStore } from '../../../../store/shop.state'
import cl from './common.module.scss'
import { useDeleteShop } from './hooks/useDeleteShop'

export const Common = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { mutate } = useDeleteShop()
  const deleteShopHandler = () => {
    mutate(id)
  }

  return (
    <>
      <h1 className="title">Общие настройки</h1>
      <div className="line"></div>

      <div className={[cl.halfFull, 'card', 'animate'].join(' ')}>
        <div className={cl.card__wrapper}>
          <h3>Удаление магазина</h3>
          <p>Удалим заказы, подписчиков, товары и интеграции. Восстановить уже не получится.</p>

          <Button onClick={deleteShopHandler} type="button" className="danger">
            Удалить магазин
          </Button>
        </div>
      </div>
    </>
  )
}
