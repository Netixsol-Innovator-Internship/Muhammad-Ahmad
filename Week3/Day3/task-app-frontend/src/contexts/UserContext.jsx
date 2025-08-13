import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // We can decode the token to get user info, or create a /me endpoint
          // For now, let's just set a basic user object
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ id: payload.userId });
        } catch (err) {
          console.error("Failed to load user:", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
