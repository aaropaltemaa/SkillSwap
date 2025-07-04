import { Link } from "react-router-dom";
import { FaHandshake, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const NavBar = ({ setUser, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedSkillSwapUser");
    setUser(null);
  };

  return (
    <nav className="flex justify-between px-10 py-5 bg-gray-800 text-white text-lg max-w-screen-xl mx-auto rounded-2xl shadow-lg">
      <Link
        to="/"
        className="hover:text-blue-600 transition flex items-center gap-2"
      >
        <FaHandshake className="w-8 h-8" aria-label="SkillSwap Logo" />
        <span className="font-bold text-xl">SkillSwap</span>
      </Link>
      <div className="flex gap-8 items-center">
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                Exchanges
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to="/exchanges/upcoming"
                    className="block px-4 py-2 hover:bg-indigo-100 rounded-t-lg"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Upcoming Exchanges
                  </Link>
                  <Link
                    to="/my-requests"
                    className="block px-4 py-2 hover:bg-indigo-100 rounded-b-lg"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Requests
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="create-exchange"
              className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
            >
              Create
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
            >
              Log out
            </button>
            <Link to="/profile" className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-300" title="Profile" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-blue-600 transition">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-blue-600 transition">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
