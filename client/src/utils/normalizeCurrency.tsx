export const normalizePrice = (price: number | undefined) => {
  if (price === undefined) return

  return new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(+price)
}

export const currentPrice = (price: number, discount: number) => {
  const total = +price - +discount
  return normalizePrice(total)
}
