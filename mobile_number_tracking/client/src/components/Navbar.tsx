import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Home, LogIn, UserPlus, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLogin') === '1';

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600'
      : 'text-gray-600 hover:text-blue-600';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              PhoneTracker
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className={`flex flex-col items-center sm:flex-row sm:space-x-1 ${isActive(
                    '/'
                  )}`}
                >
                  <Home size={20} />
                  <span className="text-sm sm:block hidden">Home</span>
                </Link>
                <Link
                  to="/track"
                  className={`flex flex-col items-center sm:flex-row sm:space-x-1 ${isActive(
                    '/track'
                  )}`}
                >
                  <Phone size={20} />
                  <span className="text-sm sm:block hidden">Track</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center sm:flex-row sm:space-x-1 text-gray-600 hover:text-blue-600"
                >
                  <LogOut size={20} />
                  <span className="text-sm sm:block hidden">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`flex flex-col items-center sm:flex-row sm:space-x-1 ${isActive(
                    '/'
                  )}`}
                >
                  <Home size={20} />
                  <span className="text-sm sm:block hidden">Home</span>
                </Link>
                <Link
                  to="/login"
                  className={`flex flex-col items-center sm:flex-row sm:space-x-1 ${isActive(
                    '/login'
                  )}`}
                >
                  <LogIn size={20} />
                  <span className="text-sm sm:block hidden">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={`flex flex-col items-center sm:flex-row sm:space-x-1 ${isActive(
                    '/signup'
                  )}`}
                >
                  <UserPlus size={20} />
                  <span className="text-sm sm:block hidden">Signup</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
