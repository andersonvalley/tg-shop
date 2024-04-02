import cl from './delivery.module.scss'
import { FiPlus } from 'react-icons/fi'
import { DeliveryItem } from './deliveryItem/DeliveryItem'

export const Delivery = () => {
  const delivery = [
    { title: 'Самовывоз', id: 0 },
    { title: 'Курьером', id: 1 },
  ]

  return (
    <>
      <h1 className="title">Настройки доставки</h1>
      <div className="line"></div>

      <div className={['card', 'card__full', 'animate', 'animate-min'].join(' ')}>
        <div className={cl.cardInner}>
          <div className="card__header">
            <span>Способ доставки</span>{' '}
            <button className="button-add">
              <FiPlus size={23} />
            </button>
          </div>

          {delivery.map(item => (
            <DeliveryItem key={item.id} />
          ))}
        </div>
      </div>
    </>
  )
}
