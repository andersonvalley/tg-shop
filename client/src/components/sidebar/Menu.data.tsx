import { LuShoppingCart, LuTags } from 'react-icons/lu'
import { APP_PATH } from '../../routes/config/Paths'
import { RiMessage3Line } from 'react-icons/ri'
import { MdPeopleOutline } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { LiaTelegramPlane } from 'react-icons/lia'

export const Menu = [
  { title: 'Товары', link: APP_PATH.CATALOG, icon: <LuTags /> },
  { title: 'Заказы', link: APP_PATH.ORDERS, icon: <LuShoppingCart /> },
  { title: 'Сообщения', link: APP_PATH.MESSAGE, icon: <RiMessage3Line /> },
  { title: 'Подписчики', link: APP_PATH.SUBSCRIBERS, icon: <MdPeopleOutline /> },
  { title: 'Рассылки', link: APP_PATH.SHARE, icon: <LiaTelegramPlane /> },
  { title: 'Настройки', link: APP_PATH.SETTINGS, icon: <IoSettingsOutline /> },
]
