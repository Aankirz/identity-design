import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginCode, setLoginCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Login to get started</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          value={loginCode}
          onChange={(e) => setLoginCode(e.target.value)}
          placeholder="Enter login code"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Continue to Identity</button>
      </form>
      <p className="mt-4">
        Don't have the code? <a href="#" className="text-blue-500">Get it now!</a>
        <br />
        or <a href="/register" className="text-blue-500">Create Project without login</a>
      </p>
    </div>
  );
};

export default Login;
