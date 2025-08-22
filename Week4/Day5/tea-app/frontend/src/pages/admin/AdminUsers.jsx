import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  useGetAllUsersQuery, 
  useUpdateUserRoleMutation, 
  useToggleUserBlockMutation 
} from '../../store/adminApiSlice';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // RTK Query hooks
  const { data: usersData, isLoading, error } = useGetAllUsersQuery();
  const [updateUserRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();
  const [toggleUserBlock, { isLoading: isTogglingBlock }] = useToggleUserBlockMutation();

  const users = usersData?.data?.users || [];

  const handleRoleChange = async () => {
    try {
      await updateUserRole({ 
        userId: selectedUser._id, 
        role: newRole 
      }).unwrap();
      
      setShowRoleModal(false);
      setSelectedUser(null);
      setNewRole('');
    } catch (error) {
      console.error('Error updating role:', error);
      alert(error?.data?.message || 'Error updating user role');
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      await toggleUserBlock(userId).unwrap();
    } catch (error) {
      console.error('Error toggling user block:', error);
      alert(error?.data?.message || 'Error updating user status');
    }
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const canChangeRole = (targetUser) => {
    if (currentUser.role === 'admin') {
      // Admin can only change regular users to regular users
      return targetUser.role === 'user';
    } else if (currentUser.role === 'superAdmin') {
      // SuperAdmin can change users and admins, but not other superAdmins
      return targetUser.role !== 'superAdmin' || targetUser._id === currentUser.id;
    }
    return false;
  };

  const canBlock = (targetUser) => {
    if (currentUser._id === targetUser._id) return false; // Can't block yourself
    
    if (currentUser.role === 'admin') {
      return targetUser.role === 'user';
    } else if (currentUser.role === 'superAdmin') {
      return targetUser.role !== 'superAdmin';
    }
    return false;
  };

  const getAvailableRoles = () => {
    if (currentUser.role === 'admin') {
      return ['user']; // Admin can only assign user role
    } else if (currentUser.role === 'superAdmin') {
      return ['user', 'admin', 'superAdmin'];
    }
    return [];
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'superAdmin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading users: {error?.data?.message || error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage user roles and access permissions</p>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Change Role for {selectedUser.name}
            </h2>
            
            <div className="mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Select New Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getAvailableRoles().map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={isUpdatingRole}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
              >
                {isUpdatingRole ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table - Desktop */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className={user.isBlocked ? 'bg-red-50' : ''}>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs lg:text-sm font-medium text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <div className="text-xs lg:text-sm font-medium text-gray-900">
                          {user.name}
                          {user._id === currentUser.id && (
                            <span className="ml-2 text-xs text-blue-600">(You)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isBlocked 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {canChangeRole(user) && (
                      <button
                        onClick={() => openRoleModal(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Change Role
                      </button>
                    )}
                    {canBlock(user) && (
                      <button
                        onClick={() => handleToggleBlock(user._id)}
                        disabled={isTogglingBlock}
                        className={`${
                          user.isBlocked
                            ? 'text-green-600 hover:text-green-900'
                            : 'text-red-600 hover:text-red-900'
                        } disabled:opacity-50`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Users Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className={`bg-white rounded-lg shadow p-4 ${user.isBlocked ? 'border-l-4 border-red-500' : 'border-l-4 border-transparent'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {user.name}
                    {user._id === currentUser.id && (
                      <span className="ml-2 text-xs text-blue-600">(You)</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex flex-col space-y-2">
              <div className="text-xs text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                {canChangeRole(user) && (
                  <button
                    onClick={() => openRoleModal(user)}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs font-medium hover:bg-blue-100"
                  >
                    Change Role
                  </button>
                )}
                {canBlock(user) && (
                  <button
                    onClick={() => handleToggleBlock(user._id)}
                    disabled={isTogglingBlock}
                    className={`flex-1 px-3 py-2 rounded text-xs font-medium disabled:opacity-50 ${
                      user.isBlocked
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No users found</p>
          </div>
        )}
      </div>

      {/* Role Management Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Role Management Rules</h3>
        <div className="text-xs text-blue-700 space-y-1">
          {currentUser.role === 'admin' && (
            <p>• As an Admin, you can only change roles of regular users</p>
          )}
          {currentUser.role === 'superAdmin' && (
            <>
              <p>• As a Super Admin, you can change roles of users and admins</p>
              <p>• You cannot modify other Super Admins</p>
            </>
          )}
          <p>• Blocked users cannot sign in to the application</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
