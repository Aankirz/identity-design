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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Identity</Link>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
