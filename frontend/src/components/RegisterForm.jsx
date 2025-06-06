import { useState } from "react"
import { useNavigate } from "react-router-dom"
import registerService from "../services/register"

const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()
        await registerService.register({
            username, name, password, email
        })

        setUsername('')
        setName("")
        setPassword('')
        setEmail("")
        navigate("/")
    }

    return (
        <section className="max-w-md mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-13">
                Register
            </h1>
            <form onSubmit={handleRegister} className="space-y-6">
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
                    Name
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={name}
                        name="name"
                        onChange={({ target }) => setName(target.value)}
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
                <div>
                    Email
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={email}
                        name="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Sign Up</button>
            </form>
        </section>
    )
}

export default RegisterForm