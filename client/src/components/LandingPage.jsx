import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">Identity</h1>
      <div className="text-center mb-8">
        <p className="text-lg">Quick Design Systems, Zero Grunt.</p>
        <p className="text-lg">Build design systems faster than ever. Turn your styles into scalable systems.</p>
      </div>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white p-2 rounded">Login</Link>
        <Link to="/register" className="bg-green-500 text-white p-2 rounded">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
