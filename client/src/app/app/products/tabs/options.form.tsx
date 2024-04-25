import { Input } from '@/src/components/UI/input/input'
import { useValidate } from '@/src/hooks/useValidate'
import { Checkbox, Tooltip } from 'antd'
import React from 'react'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { IoIosHelpCircleOutline } from 'react-icons/io'

import styles from '../products.module.scss'
import { MdOutlineDelete } from 'react-icons/md'
import { SubmitButton } from '@/src/components/UI/button/submitButton'

interface iOption {
  title: string
  price: string
  id: string
}

interface optionsValue {
  titleOption: string
  requiredOption: boolean
  options: iOption[]
}

interface Props {
  optionsValues: optionsValue
  setOptionsValues: (type: optionsValue) => void
}

export const OptionsForm = ({ optionsValues, setOptionsValues }: Props) => {
  const { onChange } = useValidate()

  const handleRemoveOption = (idToRemove: string) => {
    const updatedOptions = optionsValues.options.filter(option => option.id !== idToRemove)
    setOptionsValues({
      ...optionsValues,
      options: updatedOptions.map((option, index) => ({ ...option, id: String(index) })),
    })
  }

  return (
    <>
      <Input
        label="Название"
        value={optionsValues.titleOption}
        onChange={e => setOptionsValues({ ...optionsValues, titleOption: e.target.value })}
        placeholder="Соус к пицце"
      />

      <span className={styles.label}>Варианты: </span>

      {optionsValues.options.map(item => {
        return (
          <div key={item.id} className={styles.wrapper}>
            <Input
              label=""
              value={item.title}
              onChange={e => {
                const updatedOptions = optionsValues.options.map(option => {
                  if (option.id === item.id) {
                    return { ...option, title: e.target.value }
                  }
                  return option
                })

                setOptionsValues({ ...optionsValues, options: updatedOptions })
              }}
              placeholder="Сырный"
              width="77%"
            />
            <Input
              label=""
              value={item.price}
              onChange={e => {
                onChange(e.target.value, value => {
                  const updatedOptions = optionsValues.options.map(option => {
                    if (option.id === item.id) {
                      return { ...option, price: value }
                    }
                    return option
                  })
                  setOptionsValues({ ...optionsValues, options: updatedOptions })
                })
              }}
              placeholder="Цена"
              width="33%"
              icon="₽"
            />
            <button onClick={() => handleRemoveOption(item.id)} type="button" className={styles.buttonRemove}>
              <MdOutlineDelete size={23} />
            </button>
          </div>
        )
      })}

      <div className={styles.extraButton}>
        <button
          className={styles.addOption}
          onClick={() => {
            const newId =
              optionsValues.options.length > 0
                ? optionsValues.options[optionsValues.options.length - 1].id + 1
                : 0
            setOptionsValues({
              ...optionsValues,
              options: [
                ...optionsValues.options,
                {
                  title: '',
                  price: '',
                  id: String(newId),
                },
              ],
            })
          }}
          type="button"
        >
          <HiOutlinePlusSm /> Добавить вариант
        </button>

        <div className={styles.checkWrapper}>
          <Checkbox
            className={styles.checkbox}
            checked={optionsValues.requiredOption}
            onChange={e => setOptionsValues({ ...optionsValues, requiredOption: e.target.checked })}
          >
            Обязательная опция
          </Checkbox>
          <Tooltip title="Клиент не сможет заказать товар, пока не выберет один из вариантов">
            <span className="center">
              <IoIosHelpCircleOutline />
            </span>
          </Tooltip>
        </div>
      </div>

      <SubmitButton>Добавить опцию</SubmitButton>
    </>
  )
}
