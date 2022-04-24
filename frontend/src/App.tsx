import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Calendar,
  Home,
  Login,
  Dashboard,
  Profile,
  Projects,
  ProjectDetails,
  Register,
  Reports,
  Team,
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
          path="/team"
          element={
            <AuthRoute>
              <Team />
            </AuthRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <AuthRoute>
              <Calendar />
            </AuthRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <AuthRoute>
              <Reports />
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
