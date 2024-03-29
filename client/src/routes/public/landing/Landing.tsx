import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div>
      Landing <Link to={'site/1'}>link</Link> <Link to="/login">login</Link>
    </div>
  )
}
