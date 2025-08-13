import { useState } from "react";
import api from "../services/api";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
        Login
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 sm:py-3 text-white rounded transition text-sm sm:text-base ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-xs sm:text-sm mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
