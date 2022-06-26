import { Navigate } from 'react-router-dom'
import { useUser } from 'hooks'
import { LoginForm } from '../components'

export const Login = () => {
  const user = useUser()

  if (user) return <Navigate to="/dashboard" replace />
  return <LoginForm />
}
