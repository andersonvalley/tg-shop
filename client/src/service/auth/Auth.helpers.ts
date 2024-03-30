export const saveTokenStorage = (token: string) => {
  localStorage.setItem('token', token)
}

export const getTokenStorage = () => {
  return localStorage.getItem('token')
}

export const removeTokenStorage = () => {
  localStorage.removeItem('token')
}
