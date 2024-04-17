import { LuSettings2, LuShoppingCart, LuTags } from 'react-icons/lu'
import { RiMessage3Line } from 'react-icons/ri'
import { MdAddCard, MdOutlineDeliveryDining, MdPeopleOutline } from 'react-icons/md'
import { LiaTelegramPlane } from 'react-icons/lia'
import { PiContactlessPaymentBold } from 'react-icons/pi'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineKey } from 'react-icons/hi'
import { TbCategory2, TbPuzzle } from 'react-icons/tb'
import { FaRegBell } from 'react-icons/fa'
import { PATHS } from '@/src/constants/pages-url.config'

export const Menu = [
  { title: 'Категории', link: PATHS.CATALOG, icon: TbCategory2 },
  { title: 'Товары', link: PATHS.PRODUCTS, icon: LuTags },
  { title: 'Заказы', link: PATHS.ORDERS, icon: LuShoppingCart },
  { title: 'Сообщения', link: PATHS.MESSAGES, icon: RiMessage3Line },
  { title: 'Подписчики', link: PATHS.SUBSCRIBERS, icon: MdPeopleOutline },
  { title: 'Рассылки', link: PATHS.SHARE, icon: LiaTelegramPlane },
]

export const SubMenu = [
  { title: 'Общие', link: PATHS.COMMON, icon: LuSettings2 },
  { title: 'Доставка', link: PATHS.DELIVERY, icon: MdOutlineDeliveryDining },
  { title: 'Оплата', link: PATHS.PAYMENT, icon: PiContactlessPaymentBold },
  { title: 'Промокоды', link: PATHS.PROMOCODES, icon: MdAddCard },
  { title: 'Оформление', link: PATHS.VIEW, icon: AiOutlineEye },
  { title: 'Доступы', link: PATHS.ACCESS, icon: HiOutlineKey },
  { title: 'Интеграции', link: PATHS.INTEGRATION, icon: TbPuzzle },
  { title: 'Уведомления', link: PATHS.NOTIFICATIONS, icon: FaRegBell },
]
