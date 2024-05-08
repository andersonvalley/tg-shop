import { useSpring, config } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

export const useAnimate = () => {
  const [expanded, setExpanded] = useState(false)
  const [measureRef, { height }] = useMeasure()

  const subMenuStyles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: expanded ? height + 16 : 0,
      top: expanded ? '60px' : '-20px',
      opacity: expanded ? 1 : 0,
    },
  })

  const buttonRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLElement | null>(null)

  const clickHandler = (e: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)

    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [])

  return { setExpanded, buttonRef, menuRef, measureRef, subMenuStyles }
}
