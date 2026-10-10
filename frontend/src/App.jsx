import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import AdminDashboard from './pages/AdminDashboard'
import AdvisorDashboard from './pages/AdvisorDashboard'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/advisor"
          element={<AdvisorDashboard />}
        />

        <Route
        path="/student"
        element={<StudentDashboard />}
        />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App