import { LuSettings2, LuShoppingCart, LuTags } from 'react-icons/lu'
import { DYNAMIC_LINK } from '../../routes/config/Paths'
import { RiMessage3Line } from 'react-icons/ri'
import { MdAddCard, MdOutlineDeliveryDining, MdPeopleOutline } from 'react-icons/md'
import { LiaTelegramPlane } from 'react-icons/lia'
import { PiContactlessPaymentBold } from 'react-icons/pi'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineKey } from 'react-icons/hi'
import { TbPuzzle } from 'react-icons/tb'
import { FaRegBell } from 'react-icons/fa'
import { useMemo } from 'react'

export const Menu = (id: string) => {
  const dynamicLink = useMemo(() => DYNAMIC_LINK(id), [id])

  return [
    { title: 'Товары', link: dynamicLink.CATALOG, icon: <LuTags size={23} /> },
    { title: 'Заказы', link: dynamicLink.ORDERS, icon: <LuShoppingCart size={23} /> },
    { title: 'Сообщения', link: dynamicLink.MESSAGE, icon: <RiMessage3Line size={23} /> },
    { title: 'Подписчики', link: dynamicLink.SUBSCRIBERS, icon: <MdPeopleOutline size={23} /> },
    { title: 'Рассылки', link: dynamicLink.SHARE, icon: <LiaTelegramPlane size={23} /> },
  ]
}

export const SubMenu = (id: string) => {
  const dynamicLink = useMemo(() => DYNAMIC_LINK(id), [id])

  return [
    { title: 'Общие', link: dynamicLink.COMMON, icon: <LuSettings2 size={23} /> },
    { title: 'Доставка', link: dynamicLink.DELIVERY, icon: <MdOutlineDeliveryDining size={23} /> },
    { title: 'Оплата', link: dynamicLink.PAYMENT, icon: <PiContactlessPaymentBold size={23} /> },
    { title: 'Промокоды', link: dynamicLink.PROMOCODES, icon: <MdAddCard size={23} /> },
    { title: 'Оформление', link: dynamicLink.VIEW, icon: <AiOutlineEye size={23} /> },
    { title: 'Доступы', link: dynamicLink.ACCESS, icon: <HiOutlineKey size={23} /> },
    { title: 'Интеграции', link: dynamicLink.INTEGRATION, icon: <TbPuzzle size={23} /> },
    { title: 'Уведомления', link: dynamicLink.NOTIFICATIONS, icon: <FaRegBell size={23} /> },
  ]
}
