import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault()
        console.log("button clicked")
    }

    return (
        <section className="max-w-md mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-15">
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