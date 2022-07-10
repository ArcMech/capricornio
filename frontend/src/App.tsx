import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Home,
  Login,
  Dashboard,
  Profile,
  Projects,
  ProjectDetails,
  Register,
  Users,
} from './pages'
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
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/support"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
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
        <Route
          path="/projects"
          element={
            <AuthRoute>
              <Projects />
            </AuthRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AuthRoute>
              <Users />
            </AuthRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <AuthRoute>
              <ProjectDetails />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
