import { config, useSpring } from '@react-spring/web'
import { useState } from 'react'
import useMeasure from 'react-use-measure'

export const useAnimation = () => {
  const [expanded, setExpanded] = useState(false)
  const [expandedSubMenu, setExpandedSubMenu] = useState(false)
  const [measureRef, { height }] = useMeasure()
  const [measureRefSubMenu, { height: heightSubMenu }] = useMeasure()

  const styles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: expanded ? height : 0,
    },
  })

  const stylesSubMenu = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: expandedSubMenu ? heightSubMenu : 0,
    },
  })

  return { stylesSubMenu, styles, measureRef, measureRefSubMenu, setExpandedSubMenu, setExpanded }
}
