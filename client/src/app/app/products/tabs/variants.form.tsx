import { Input } from '@/src/components/UI/input/input'
import { useValidate } from '@/src/hooks/useValidate'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import { SubmitButton } from '@/src/components/UI/button/submitButton'
import { IVariant } from '@/src/types/goods.interface'

import styles from '../products.module.scss'

interface variantsValue {
  titleVariant: string
  variants: IVariant[]
}

interface Props {
  variantValues: variantsValue
  setVariantValues: (type: variantsValue) => void
}

export const VariantsForm = ({ variantValues, setVariantValues }: Props) => {
  const { onChange } = useValidate()

  const handleRemoveOption = (idToRemove: string) => {
    const updatedVariants = variantValues.variants.filter(variant => variant.id !== idToRemove)
    setVariantValues({
      ...variantValues,
      variants: updatedVariants.map((option, index) => ({ ...option, id: String(index) })),
    })
  }

  return (
    <>
      <Input
        label="Название"
        value={variantValues.titleVariant}
        onChange={e => setVariantValues({ ...variantValues, titleVariant: e.target.value })}
        placeholder="Цвет, размер или материал"
      />

      <span className={styles.label}>Варианты: </span>

      {variantValues.variants.map(item => {
        return (
          <div key={item.id} className={[styles.wrapper, styles.wrapperVariants].join(' ')}>
            <Input
              label=""
              value={item.title}
              onChange={e => {
                const updatedOptions = variantValues.variants.map(option => {
                  if (option.id === item.id) {
                    return { ...option, title: e.target.value }
                  }
                  return option
                })

                setVariantValues({ ...variantValues, variants: updatedOptions })
              }}
              placeholder="Размер S"
              width="50%"
            />
            <Input
              label=""
              value={item.price}
              onChange={e => {
                onChange(e.target.value, value => {
                  const updatedOptions = variantValues.variants.map(option => {
                    if (option.id === item.id) {
                      return { ...option, price: value }
                    }
                    return option
                  })
                  setVariantValues({ ...variantValues, variants: updatedOptions })
                })
              }}
              placeholder="Цена"
              icon="₽"
            />
            <Input
              label=""
              value={item.weight}
              onChange={e => {
                onChange(e.target.value, value => {
                  const updatedOptions = variantValues.variants.map(option => {
                    if (option.id === item.id) {
                      return { ...option, weight: value }
                    }
                    return option
                  })
                  setVariantValues({ ...variantValues, variants: updatedOptions })
                })
              }}
              placeholder="Вес"
              icon="г"
              required={false}
            />
            <Input
              label=""
              value={item.quantity}
              onChange={e => {
                onChange(e.target.value, value => {
                  const updatedOptions = variantValues.variants.map(option => {
                    if (option.id === item.id) {
                      return { ...option, quantity: value }
                    }
                    return option
                  })
                  setVariantValues({ ...variantValues, variants: updatedOptions })
                })
              }}
              placeholder="~"
              icon="шт"
              required={false}
            />
            <Input
              label=""
              value={item.vendorCode}
              onChange={e => {
                const updatedOptions = variantValues.variants.map(option => {
                  if (option.id === item.id) {
                    return { ...option, vendorCode: e.target.value }
                  }
                  return option
                })

                setVariantValues({ ...variantValues, variants: updatedOptions })
              }}
              placeholder="Артикул"
              required={false}
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
              variantValues.variants.length > 0
                ? variantValues.variants[variantValues.variants.length - 1].id + 1
                : 0
            setVariantValues({
              ...variantValues,
              variants: [
                ...variantValues.variants,
                {
                  title: '',
                  price: '',
                  id: String(newId),
                  weight: '',
                  vendorCode: '',
                  quantity: '',
                },
              ],
            })
          }}
          type="button"
        >
          <HiOutlinePlusSm /> Добавить вариант
        </button>
      </div>

      <SubmitButton>Добавить вариант</SubmitButton>
    </>
  )
}
