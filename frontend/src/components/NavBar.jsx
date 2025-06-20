import { Link } from "react-router-dom"
import { FaHandshake } from "react-icons/fa" // Example icon

const NavBar = ({ setUser, user }) => {
    const handleLogout = () => {
        window.localStorage.removeItem("loggedSkillSwapUser")
        setUser(null)
    }

    return (
        <nav className="flex justify-between px-10 py-5 bg-gray-800 text-white text-lg max-w-screen-xl mx-auto rounded-2xl shadow-lg">
            <Link to="/" className="hover:text-blue-600 transition flex items-center gap-2">
                <FaHandshake className="w-8 h-8" aria-label="SkillSwap Logo" />
                <span className="font-bold text-xl">SkillSwap</span>
            </Link>
            <div className="flex gap-8">
                {user ? (
                    <>
                        <button
                            onClick={handleLogout}
                            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
                        >
                            Log out
                        </button>
                        <Link
                            to="my-requests"
                            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
                        >
                            My Requests
                        </Link>
                        <Link
                            to="create-exchange"
                            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
                        >
                            Create
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="hover:text-blue-600 transition">Sign Up</Link>
                        <Link to="/login" className="hover:text-blue-600 transition">Sign In</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar