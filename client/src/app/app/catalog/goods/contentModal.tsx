// 'use client'

// import { SubmitButton } from '@/src/components/UI/button/submitButton'
// import { Input } from '@/src/components/UI/input/input'
// import { SelectUi } from '@/src/components/UI/select/select'

// import { useValidate } from '@/src/hooks/useValidate'
// import { Tabs, TabsProps } from 'antd'
// import React, { useState } from 'react'
// import { Basic } from './tabs/basic'
// import { Options } from './tabs/options'
// import { Variants } from './tabs/variants'

// export interface formType {
//   title: string
//   description: string
//   price: string
//   priceFrom: string
//   apply: string
// }

// export const ContentModal = () => {
//   const [values, setValues] = useState<formType>({
//     title: '',
//     description: '',
//     price: '',
//     priceFrom: '',
//     apply: 'first',
//   })

//   const { onChange } = useValidate()

//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: 'Основное',
//       children: <Basic values={values} setValues={setValues} />,
//     },
//     {
//       key: '2',
//       label: 'Варианты',
//       children: <Variants values={values} setValues={setValues} />,
//     },
//     {
//       key: '3',
//       label: 'Опции',
//       children: <Options values={values} setValues={setValues} />,
//     },
//   ]

//   const onChangeHandler = (key: string) => {
//     console.log(key)
//   }

//   return (
//     <>
//       <form>
//         <Tabs defaultActiveKey="1" items={items} onChange={onChangeHandler}></Tabs>

//         <div className="line"></div>
//         <SubmitButton>Добавить способ</SubmitButton>
//       </form>
//     </>
//   )
// }
