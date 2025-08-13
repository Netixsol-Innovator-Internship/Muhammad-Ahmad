import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handleLogout() {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg sm:text-xl">
          <Link to={token ? "/dashboard" : "/login"} className="hover:text-blue-200 transition-colors">
            TaskApp
          </Link>
        </div>
        <div className="flex items-center">
          {token ? (
            <>
              <Link 
                to="/dashboard" 
                className="hidden sm:inline mr-4 hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-2 sm:space-x-4">
              <Link 
                to="/login" 
                className="hover:text-blue-200 transition-colors text-sm sm:text-base"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="hover:text-blue-200 transition-colors text-sm sm:text-base"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
