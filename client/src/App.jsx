import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Project from './components/Dashboard/Project';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:projectName" element={<Project />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
