import { useLocation, Navigate } from 'react-router'

export const AuthRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
