export const replaceBr = (text: string | undefined): string => {
  if (!text) return ''
  return text.replace(/<br\s*\/?>/g, '\n')
}
