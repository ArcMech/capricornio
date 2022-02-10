import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Dashboard } from './pages'
import { AuthRoute } from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
