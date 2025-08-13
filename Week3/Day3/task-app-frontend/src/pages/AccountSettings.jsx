import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      setError("Please type 'DELETE' to confirm account deletion");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await api.delete("/users/account");
      localStorage.removeItem("token");
      alert("Your account has been deleted successfully.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Account Settings
          </h1>

          {/* Account Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Account Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Email:</p>
              <p className="text-gray-800 font-medium">
                {user?.email || "Loading..."}
              </p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Danger Zone
            </h2>
            
            {!showDeleteConfirm ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-medium mb-2">
                  Delete Account
                </h3>
                <p className="text-red-700 text-sm mb-4">
                  Once you delete your account, there is no going back. This will permanently 
                  delete your account and all your tasks.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Delete Account
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-medium mb-2">
                  Confirm Account Deletion
                </h3>
                <p className="text-red-700 text-sm mb-4">
                  This action cannot be undone. This will permanently delete your account 
                  and all associated tasks.
                </p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Type <span className="font-bold">DELETE</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder="Type DELETE here"
                  />
                </div>

                {error && (
                  <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading || deleteConfirmText !== "DELETE"}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {loading ? "Deleting..." : "Delete Account Forever"}
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    disabled={loading}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
