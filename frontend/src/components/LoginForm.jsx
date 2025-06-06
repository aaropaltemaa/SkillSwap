import { useState } from "react"
import loginService from "../services/login"
import exchangeRequestService from "../services/exchangerequests"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem("loggedSkillSwapUser", JSON.stringify(user))
        exchangeRequestService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        navigate("/")
    }

    return (
        <section className="max-w-md mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-13">
                Log in
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    Username
                    <input
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Login</button>
            </form>
        </section>
    )
}

export default LoginForm