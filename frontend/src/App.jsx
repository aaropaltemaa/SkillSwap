import NavBar from "./components/NavBar"
import LoginForm from "./components/LoginForm"
import HomePage from "./pages/HomePage"
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="py-20 text-center">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App