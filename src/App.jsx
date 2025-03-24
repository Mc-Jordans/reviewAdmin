import React from 'react'
import AdminDashboard from './pages/AdminDashboard'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard/> } />
      </Routes>
  </Router>
  )
}

export default App