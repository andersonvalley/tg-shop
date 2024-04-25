import { Input } from '@/src/components/UI/input/input'
import { createIGood } from '@/src/types/goods.interface'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  values: createIGood
  setValues: (type: any) => void
}

export const Variants = ({ values, setValues }: Props) => {
  const [openModalVariants, setOpenModalVariants] = useState(false)

  const [variants, setVariants] = useState([
    {
      title: '',
      vendorCode: '',
      price: '',
      weight: '',
      quantity: '',
      id: 0,
    },
  ])

  const addVariantHandler = () => {
    setVariants([
      ...variants,
      {
        title: '',
        vendorCode: '',
        price: '',
        weight: '',
        quantity: '',
        id: variants.length + 1,
      },
    ])
  }

  return (
    <>
      <p>Разновидности одного товара</p>
      <span>Например: цвет, размер или материал</span>

      <Button onClick={() => setOpenModalVariants(true)}>Добавить варианты</Button>

      {openModalVariants &&
        createPortal(
          <Modal
            width={800}
            title="Новые варианты товара"
            open={openModalVariants}
            onOk={() => setOpenModalVariants(false)}
            onCancel={() => setOpenModalVariants(false)}
          >
            <form>
              <Input
                label="Название"
                value={values.title}
                onChange={e => setValues({ ...values, titleVariant: e.target.value })}
                placeholder=""
              />

              <span onClick={addVariantHandler}>Добавить новые</span>

              <ul>
                {variants.map(item => {
                  return (
                    <li key={item.id}>
                      <Input
                        label="Название"
                        value={values.title}
                        onChange={e => setValues({ ...values, titleVariant: e.target.value })}
                        placeholder=""
                      />
                    </li>
                  )
                })}
              </ul>
            </form>
          </Modal>,
          document.body
        )}
    </>
  )
}
