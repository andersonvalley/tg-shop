export const normalizeDate = (timestamp: string | undefined) => {
  if (!timestamp) return

  const date = new Date(timestamp)
  return (
    date.toLocaleDateString('ru', { dateStyle: 'medium' }) +
    ' в ' +
    date.toLocaleString('ru', { hour: 'numeric', minute: '2-digit' })
  )
}
