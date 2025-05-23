import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import NavBar from './UI/NavBar'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import exchangeRequestService from './services/exchangerequests'

const App = () => {
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSkillSwapUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      exchangeRequestService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedSkillSwapUser")
    setUser(null)
  }

  return (
    <Box sx={{ maxWidth: 1350, mx: 'auto' }}>
      <Router>
        <NavBar user={user} handleLogout={handleLogout} />
        <Box sx={{ mt: 5, mx: 36, textAlign: "center" }}>
          <Routes>
            <Route path="/" element={<HomePage user={user} successMessage={successMessage} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm setUser={setUser} setSuccessMessage={setSuccessMessage} />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  )
}


export default App