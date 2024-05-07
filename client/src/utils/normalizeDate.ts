export const normalizeDate = (timestamp: string | undefined) => {
  if (!timestamp) return

  const date = new Date(timestamp)
  return (
    date.toLocaleDateString('ru', { dateStyle: 'medium' }) +
    ' в ' +
    date.toLocaleString('ru', { hour: 'numeric', minute: '2-digit' })
  )
}

export const normalizeOnlyDate = (timestamp: string | undefined) => {
  if (!timestamp) return

  const date = new Date(timestamp)
  return date.toLocaleDateString('ru', { dateStyle: 'medium' })
}

export const normalizeOnlyTime = (timestamp: string | undefined) => {
  if (!timestamp) return

  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
