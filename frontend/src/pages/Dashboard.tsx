import { useNavigate } from 'react-router'

export const Dashboard = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
      You are in dashboard!
      <button onClick={logout}>Logout</button>
    </div>
  )
}
