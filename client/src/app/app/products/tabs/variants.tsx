'use client'

import { createIGood } from '@/src/types/goods.interface'
import React, { useState } from 'react'
import styles from '../products.module.scss'
import { SimpleButton } from '@/src/components/UI/button/simpleButton'
import { createPortal } from 'react-dom'
import { Modal } from 'antd'
import { MdOutlineDelete } from 'react-icons/md'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { VariantsForm } from './variants.form'
interface Props {
  values: createIGood
  setValues: (type: any) => void
}

export const Variants = ({ values, setValues }: Props) => {
  const [variantValues, setVariantValues] = useState({
    titleVariant: values.titleVariant,
    variants:
      values.variants.length === 0
        ? [
            {
              title: '',
              price: '',
              id: '1',
              weight: '',
              vendorCode: '',
              quantity: '',
            },
          ]
        : values.variants,
  })
  const [openModalExtra, setOpenModalExtra] = useState(false)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setValues({
      ...values,
      titleVariant: variantValues.titleVariant,
      variants: variantValues.variants,
    })

    setOpenModalExtra(false)
  }

  const deleteAllHandler = () => {
    setValues({
      ...values,
      titleVariant: '',
      variants: [],
    })
  }

  return (
    <>
      <p className={styles.extraTitle}>Разновидности одного товара</p>
      <span className={styles.extraText}>Например: цвет, размер или материал</span>
      {values.titleVariant && (
        <ul className={styles.extraList}>
          <li>
            <span onClick={() => setOpenModalExtra(true)}>{values.titleVariant} </span>
            <button onClick={deleteAllHandler} type="button" className={styles.buttonRemove}>
              <MdOutlineDelete size={23} />
            </button>
          </li>
        </ul>
      )}
      {!values.titleVariant && (
        <div className={styles.extraButton}>
          <SimpleButton onClick={() => setOpenModalExtra(true)}>
            {' '}
            <HiOutlinePlusSm size={18} /> Добавить варинты
          </SimpleButton>
        </div>
      )}

      {openModalExtra &&
        createPortal(
          <Modal
            width={900}
            footer={[]}
            title="Новые варианты товара"
            open={openModalExtra}
            onOk={() => setOpenModalExtra(false)}
            onCancel={() => setOpenModalExtra(false)}
          >
            <form onSubmit={submitHandler}>
              <VariantsForm variantValues={variantValues} setVariantValues={setVariantValues} />
            </form>
          </Modal>,
          document.body
        )}
    </>
  )
}
