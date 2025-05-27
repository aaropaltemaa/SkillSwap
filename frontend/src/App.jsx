import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import CreateExchangeForm from "./components/CreateExchangeForm"
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import ExchangeRequestsPage from './pages/ExchangeRequestsPage';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import NavBar from './UI/NavBar'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import exchangeRequestService from './services/exchangerequests'
import userService from './services/users'

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
      console.log("users fetched:", users)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSkillSwapUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      exchangeRequestService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user) return; // Wait for user to be loaded
    const fetchRequests = async () => {
      try {
        const data = await exchangeRequestService.getAll();
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch exchange requests:', error);
      }
    };
    fetchRequests();
  }, [user]);

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
            <Route path="/" element={<HomePage successMessage={successMessage} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm setUser={setUser} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />} />
            <Route path="create-exchange" element={<CreateExchangeForm user={user} users={users} />} />
            <Route
              path="/exchange-requests"
              element={<ExchangeRequestsPage currentUserId={user ? user.id : null} requests={requests} />}
            />
            <Route path="me" element={<Profile user={user} />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  )
}


export default App