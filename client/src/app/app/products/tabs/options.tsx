'use client'

import { createIGood } from '@/src/types/goods.interface'
import React, { useState } from 'react'
import styles from '../products.module.scss'
import { SimpleButton } from '@/src/components/UI/button/simpleButton'
import { createPortal } from 'react-dom'
import { Modal } from 'antd'
import { MdOutlineDelete } from 'react-icons/md'
import { OptionsForm } from './options.form'
interface Props {
  values: createIGood
  setValues: (type: any) => void
}

export const Options = ({ values, setValues }: Props) => {
  const [optionsValues, setOptionsValues] = useState({
    titleOption: values.titleOption,
    requiredOption: values.requiredOption,
    options:
      values.options.length === 0
        ? [
            {
              title: '',
              price: '',
              id: '0',
            },
          ]
        : values.options,
  })
  const [openModalExtra, setOpenModalExtra] = useState(false)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setValues({
      ...values,
      titleOption: optionsValues.titleOption,
      requiredOption: optionsValues.requiredOption,
      options: optionsValues.options,
    })

    setOpenModalExtra(false)
  }

  const deleteAllHandler = () => {
    setValues({
      ...values,
      titleOption: '',
      requiredOption: false,
      options: [],
    })
  }

  return (
    <>
      <p className={styles.extraTitle}>Дополнительные предложения к товару</p>
      <span className={styles.extraText}>Например: подарочная упаковка или соусы</span>
      {values.titleOption && (
        <ul className={styles.extraList}>
          <li>
            <span onClick={() => setOpenModalExtra(true)}>{values.titleOption} </span>
            <button onClick={deleteAllHandler} type="button" className={styles.buttonRemove}>
              <MdOutlineDelete size={23} />
            </button>
          </li>
        </ul>
      )}
      {!values.titleOption && (
        <div className={styles.extraButton}>
          <SimpleButton onClick={() => setOpenModalExtra(true)}>Добавить опцию</SimpleButton>
        </div>
      )}

      {openModalExtra &&
        createPortal(
          <Modal
            width={600}
            footer={[]}
            title="Новая опция"
            open={openModalExtra}
            onOk={() => setOpenModalExtra(false)}
            onCancel={() => setOpenModalExtra(false)}
          >
            <form onSubmit={submitHandler}>
              <OptionsForm optionsValues={optionsValues} setOptionsValues={setOptionsValues} />
            </form>
          </Modal>,
          document.body
        )}
    </>
  )
}
