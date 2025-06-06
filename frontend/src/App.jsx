import NavBar from "./components/NavBar"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import HomePage from "./pages/HomePage"
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import { useState, useEffect } from "react"
import exchangeRequestService from "./services/exchangerequests"

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
      <NavBar user={user} setUser={setUser} />
      <div className="py-20 text-center">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App