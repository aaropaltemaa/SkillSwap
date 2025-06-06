import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="flex justify-between px-10 py-5 bg-gray-800 text-white text-lg max-w-screen-xl mx-auto rounded-2xl shadow-lg">
            <Link to="/" className="hover:text-blue-600 transition ">Logo</Link>
            <div className="flex gap-8">
                <Link to="/login" className="hover:text-blue-600 transition">Sign In</Link>
                <Link to="/register" className="hover:text-blue-600 transition">Sign Up</Link>
            </div>
        </nav>
    )
}

export default NavBar