import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import NavBar from './UI/NavBar'
import { useEffect, useState } from 'react'
import exchangeRequestService from './services/exchangerequests'
const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSkillSwapUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      exchangeRequestService.setToken(user.token)
    }
  }, [])
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}


export default App