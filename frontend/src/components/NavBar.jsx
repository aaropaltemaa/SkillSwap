import { Link } from "react-router-dom"

const NavBar = ({ setUser, user }) => {
    const handleLogout = () => {
        window.localStorage.removeItem("loggedSkillSwapUser")
        setUser(null)
    }

    return (
        <nav className="flex justify-between px-10 py-5 bg-gray-800 text-white text-lg max-w-screen-xl mx-auto rounded-2xl shadow-lg">
            <Link to="/" className="hover:text-blue-600 transition ">Logo</Link>
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