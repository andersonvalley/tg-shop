import { useEffect, useRef, useState } from 'react'

export const useInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const [activeInput, setActiveInput] = useState(0)

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)

    if (value === '') {
      setActiveInput(prev => Math.max(prev - 1, 0))
    } else {
      setActiveInput(prev => Math.min(prev + 1, inputValues.length - 1))
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (!event.clipboardData) return

    const pastedText = event.clipboardData.getData('text')
    const characters = pastedText.split('')
    setInputValues(characters.slice(0, 6))
    setActiveInput(0)
  }

  useEffect(() => {
    if (activeInput === inputValues.length) return

    inputRef.current = document.querySelectorAll('input')[activeInput]
    inputRef.current.focus()
  }, [activeInput, inputValues])

  return { handleChange, handlePaste, activeInput, setActiveInput, inputValues, setInputValues, inputRef }
}
