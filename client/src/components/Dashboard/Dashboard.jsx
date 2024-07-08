import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, saveProject } from '../../store/projectSlice';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { projects, loading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(projects)) {
      console.error("Projects should be an array");
    }
  }, [projects]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = { name: projectName, plan: 'Free Plan', env: 'No Production Environment', updated: 'just now' };
    dispatch(addProject(newProject));
    dispatch(saveProject(newProject));
    navigate(`/project/${projectName}`);
    setShowModal(false);
    setProjectName('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <span className="text-gray-400 text-lg">+ Create application</span>
          </div>
          {Array.isArray(projects) && projects.map((project, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white cursor-pointer"
              onClick={() => navigate(`/project/${project.name}`)}
            >
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.plan}</p>
              <p className="text-sm text-red-500 mt-2">{project.env}</p>
              <p className="text-xs text-gray-400 mt-2">{project.updated}</p>
            </div>
          ))}
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Generate Design Systems with Figr</h2>
            <form onSubmit={handleCreateProject}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
