import NavBar from "./components/NavBar"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import CreateExchangeForm from "./components/CreateExchangeForm"
import HomePage from "./pages/HomePage"
import ExchangeRequestsPage from "./pages/ExchangeRequestsPage"
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import { useState, useEffect } from "react"
import exchangeRequestService from "./services/exchangerequests"
import userService from "./services/users"

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [exchangeRequests, setExchangeRequests] = useState([])
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
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
        setExchangeRequests(data);
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

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <div className="py-20 text-center">
        <Routes>
          <Route path="/" element={<HomePage successMessage={successMessage} user={user} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} setSuccessMessage={setSuccessMessage} />} />
          <Route path="create-exchange" element={<CreateExchangeForm user={user} users={users} exchangeRequests={exchangeRequests} setExchangeRequests={setExchangeRequests} setSuccessMessage={setSuccessMessage}/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/my-requests" element={<ExchangeRequestsPage exchangeRequests={exchangeRequests} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App