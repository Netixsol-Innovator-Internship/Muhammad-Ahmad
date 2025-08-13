import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-lg sm:text-xl">
            <Link to={token ? "/dashboard" : "/login"} className="hover:text-blue-200 transition-colors">
              TaskApp
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {token ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/settings" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-4">
            {token ? (
              <div className="space-y-2">
                <Link 
                  to="/dashboard" 
                  className="block py-2 hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/settings" 
                  className="block py-2 hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-blue-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  to="/login" 
                  className="block py-2 hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-2 hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
