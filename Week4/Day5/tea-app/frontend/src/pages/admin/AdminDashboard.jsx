import { useAuth } from '../../contexts/AuthContext';
import { useGetProductsQuery } from '../../store/productsApiSlice';
import { useGetAllUsersQuery } from '../../store/adminApiSlice';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: productsData } = useGetProductsQuery({});
  const { data: usersData } = useGetAllUsersQuery();

  const totalProducts = productsData?.data?.pagination?.total || 0;
  const totalUsers = usersData?.data?.count || 0;

  const stats = [
    {
      name: 'Total Products',
      value: totalProducts,
      icon: '📦',
      link: '/admin/products'
    },
    {
      name: 'Total Users',
      value: totalUsers,
      icon: '👥',
      link: '/admin/users'
    },
  ];

  const quickActions = [
    {
      name: 'Add New Product',
      description: 'Create a new tea product',
      link: '/admin/products',
      icon: '➕',
      color: 'bg-blue-500'
    },
    {
      name: 'Manage Users',
      description: 'View and manage user accounts',
      link: '/admin/users',
      icon: '👥',
      color: 'bg-green-500'
    },
    {
      name: 'Back to Store',
      description: 'Return to the main store',
      link: '/',
      icon: '🏪',
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Here's what's happening with your tea store today.
        </p>
      </div>

      {/* Stats Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="text-xl sm:text-2xl flex-shrink-0">{stat.icon}</div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.link}
              className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow border-l-4 border-gray-200 hover:border-blue-500"
            >
              <div className="flex items-start space-x-3">
                  <div className={`${action.color} text-white p-2 rounded-lg flex-shrink-0`}>
                    <span className="text-base sm:text-lg">{action.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 truncate">
                      {action.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed truncate">{action.description}</p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Role Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Your Permissions</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">You can:</h4>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
              <li>✅ View all products and users</li>
              <li>✅ Add and edit products</li>
              <li>✅ Update product titles and prices</li>
              {user?.role === 'admin' && (
                <>
                  <li>✅ Change roles of regular users</li>
                  <li>✅ Block/unblock regular users</li>
                </>
              )}
              {user?.role === 'superAdmin' && (
                <>
                  <li>✅ Delete products</li>
                  <li>✅ Change roles of users and admins</li>
                  <li>✅ Block/unblock users and admins</li>
                  <li>✅ Full administrative access</li>
                </>
              )}
            </ul>
          </div>
          
          {user?.role === 'admin' && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Restrictions:</h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>❌ Cannot delete products</li>
                <li>❌ Cannot modify other admins or super admins</li>
                <li>❌ Cannot assign admin or super admin roles</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
