import { LuSettings2, LuShoppingCart, LuTags } from 'react-icons/lu'
import { APP_PATH } from '../../routes/config/Paths'
import { RiMessage3Line } from 'react-icons/ri'
import { MdAddCard, MdOutlineDeliveryDining, MdPeopleOutline } from 'react-icons/md'
import { LiaTelegramPlane } from 'react-icons/lia'
import { PiContactlessPaymentBold } from 'react-icons/pi'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineKey } from 'react-icons/hi'
import { TbPuzzle } from 'react-icons/tb'
import { FaRegBell } from 'react-icons/fa'

export const Menu = [
  { title: 'Товары', link: APP_PATH.CATALOG, icon: <LuTags size={23} /> },
  { title: 'Заказы', link: APP_PATH.ORDERS, icon: <LuShoppingCart size={23} /> },
  { title: 'Сообщения', link: APP_PATH.MESSAGE, icon: <RiMessage3Line size={23} /> },
  { title: 'Подписчики', link: APP_PATH.SUBSCRIBERS, icon: <MdPeopleOutline size={23} /> },
  { title: 'Рассылки', link: APP_PATH.SHARE, icon: <LiaTelegramPlane size={23} /> },
]

export const SubMenu = [
  { title: 'Общие', link: APP_PATH.CATALOG, icon: <LuSettings2 size={23} /> },
  { title: 'Доставка', link: APP_PATH.ORDERS, icon: <MdOutlineDeliveryDining size={23} /> },
  { title: 'Оплата', link: APP_PATH.MESSAGE, icon: <PiContactlessPaymentBold size={23} /> },
  { title: 'Промокоды', link: APP_PATH.SUBSCRIBERS, icon: <MdAddCard size={23} /> },
  { title: 'Оформление', link: APP_PATH.SHARE, icon: <AiOutlineEye size={23} /> },
  { title: 'Доступы', link: APP_PATH.SHARE, icon: <HiOutlineKey size={23} /> },
  { title: 'Интеграции', link: APP_PATH.SHARE, icon: <TbPuzzle size={23} /> },
  { title: 'Уведомления', link: APP_PATH.SHARE, icon: <FaRegBell size={23} /> },
]
