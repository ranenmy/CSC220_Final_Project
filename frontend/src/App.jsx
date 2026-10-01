import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import AdminDashboard from './pages/AdminDashboard'
import AdvisorDashboard from './pages/AdvisorDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/advisor"
          element={<AdvisorDashboard />}
        />

        <Route
          path="/"
          element={<Navigate to="/advisor" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App