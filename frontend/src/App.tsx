import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Dashboard, Profile, Register } from './pages'
import { AuthRoute } from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            // <AuthRoute>
            <Dashboard />
            // </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
