export const normalizePrice = (price: number | undefined) => {
  if (!price) return

  return new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(+price)
}
