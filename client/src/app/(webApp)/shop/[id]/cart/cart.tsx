'use client'

import Link from 'next/link'
import React from 'react'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

import styles from './cart.module.scss'

export const Cart = () => {
  return (
    <div className="container container--cart">
      <BackButton onClick={() => console.log('Hello, I am back button!')} />
      <div>
        <div className={styles.top}>
          <h2 className={styles.title}>Корзина</h2>
          <div className={styles.clear}>
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className={styles.content}>
          {/* {cartItems.map(item => {
            return (
              <div key={item.title + item.price + item.sizes + item.types} className={styles.cartItem}>
                <div className={styles.cartItemImg}>
                  <img className="pizza-block__image" src={item.imageUrl} alt={item.title} />
                </div>
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p>
                    {item.types} тесто, {item.sizes} см.
                  </p>
                </div>
                <div className={styles.count}>
                  <div
                    onClick={() => dispatch(decrementQuant(item))}
                    className="button button--outline button--circle cart__item-count-minus"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      viewBox="0 0 512 512"
                      width="15px"
                      xmlSpace="preserve"
                    >
                      <path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
                    </svg>
                  </div>
                  <span>{item.quantity}</span>
                  <div
                    onClick={() => dispatch(incrementQuant(item))}
                    className="button button--outline button--circle cart__item-count-plus"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                        fill="#EB5A1E"
                      />
                      <path
                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                        fill="#EB5A1E"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.price}>
                  <b>{item.price * item.quantity} ₽</b>
                </div>
                <div onClick={() => dispatch(removeItem(item))} className={styles.cartItem__remove}>
                  <div className="button button--outline button--circle">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                        fill="#EB5A1E"
                      />
                      <path
                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                        fill="#EB5A1E"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })} */}
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom__details}>
            <span>
              {' '}
              Всего товаров: <b>10 шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>1234 ₽</b>{' '}
            </span>
          </div>
          <div className={styles.bottom__buttons}>
            <Link href="/" className="button button--outline button--add go-back-btn">
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
