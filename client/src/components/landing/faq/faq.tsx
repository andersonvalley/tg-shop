import { Collapse, CollapseProps } from 'antd'
import React from 'react'

import '../../../app/app/settings/views/views.scss'
import styles from '../page.module.scss'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Аватарка',
    children: <p>heslo</p>,
  },
]

export const Faq = () => {
  return (
    <section className={styles.faqSection}>
      <h3 className={styles.title}>FAQ</h3>

      <div className="collapse">
        <Collapse items={items} />
      </div>
    </section>
  )
}
