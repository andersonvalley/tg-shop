export const normalizePrice = (price: string) => {
  if (!price) return

  return new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(+price)
}
