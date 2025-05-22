import RegisterForm from './components/RegisterForm'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => (
  <Router>
    <div>
      <Link to="/">home</Link>
      <Link to="/register">register</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  </Router>
)


export default App