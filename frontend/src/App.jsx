import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CreateExchangeForm from "./components/CreateExchangeForm";
import UpcomingExchanges from "./components/UpcomingExchanges";
import HomePage from "./pages/HomePage";
import ExchangeRequestsPage from "./pages/ExchangeRequestsPage";
import MessagesPage from "./pages/MessagesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import exchangeRequestService from "./services/exchangerequests";
import userService from "./services/users";
import messageService from "./services/messages";
import reviewsService from "./services/reviews";
import { SocketProvider } from "./components/SocketProvider";
import UserProfilePage from "./pages/UserProfilePage";
import DiscoverPage from "./pages/DiscoverPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedSkillSwapUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userService.setToken(user.token);
      exchangeRequestService.setToken(user.token);
      messageService.setToken(user.token);
      reviewsService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (!user) return; // Wait for user to be loaded
    const fetchRequests = async () => {
      try {
        const data = await exchangeRequestService.getAll();
        setExchangeRequests(data);
      } catch (error) {
        console.error("Failed to fetch exchange requests:", error);
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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <SocketProvider user={user}>
      <Router>
        <NavBar user={user} setUser={setUser} />
        <div className="py-20 text-center">
          <Routes>
            <Route
              path="/"
              element={<HomePage successMessage={successMessage} />}
            />
            <Route
              path="/login"
              element={
                <LoginForm
                  setUser={setUser}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                />
              }
            />
            <Route
              path="create-exchange"
              element={
                <CreateExchangeForm
                  user={user}
                  users={users}
                  exchangeRequests={exchangeRequests}
                  setExchangeRequests={setExchangeRequests}
                  setSuccessMessage={setSuccessMessage}
                />
              }
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/my-requests"
              element={
                <ExchangeRequestsPage
                  exchangeRequests={exchangeRequests}
                  setExchangeRequests={setExchangeRequests}
                  user={user}
                />
              }
            />
            <Route
              path="/exchanges/upcoming"
              element={
                <UpcomingExchanges
                  user={user}
                  exchangeRequests={exchangeRequests}
                  setSuccessMessage={setSuccessMessage}
                  successMessage={successMessage}
                />
              }
            />
            <Route
              path="/messages/:userId"
              element={<MessagesPage user={user} />}
            />
            <Route
              path="/users/:userId"
              element={<UserProfilePage user={user} />}
            />
            <Route path="/discover" element={<DiscoverPage user={user} />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
};

export default App;
