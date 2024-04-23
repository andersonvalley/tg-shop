export const useLocation = () => {
  const currentPath = window.location.pathname
  const hash = window.location.hash
  return { hash, currentPath }
}
