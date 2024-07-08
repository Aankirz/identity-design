import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Identity</Link>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
