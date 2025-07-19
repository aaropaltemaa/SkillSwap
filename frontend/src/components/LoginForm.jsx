import { useState } from "react";
import loginService from "../services/login";
import exchangeRequestService from "../services/exchangerequests";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  setUser,
  setSuccessMessage,
  setErrorMessage,
  errorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedSkillSwapUser", JSON.stringify(user));
      exchangeRequestService.setToken(user.token);
      setUser(user);
      setSuccessMessage(`Welcome back, ${user.username}!`);
      setUsername("");
      setPassword("");
      navigate("/");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <section className="max-w-md mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-13">
        Log in
      </h1>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          Username
          <input
            data-testid="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            data-testid="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
