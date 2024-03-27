import React from 'react'
import { Helmet } from 'react-helmet'

export const useMeta = () => {
  return (
    <Helmet>
      <title>About - yoursite.com</title>
      <meta name="description" content="Lorem ipsum dolor sit amet" />
    </Helmet>
  )
}
