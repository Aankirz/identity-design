import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProject, setCurrentProject } from '../../../store/projectSlice';
import Colors from './Color/Colors';
import Radius from './Radius';
import Spacing from './Spacing';
import Components from './Components/Components';
import ProjectNavbar from './ProjectNavbar';

const Project = () => {
  const { projectName } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const project = projects.find(p => p.name === projectName);
  const dispatch = useDispatch();
  const [editedProject, setEditedProject] = useState(project);
  const [selectedTab, setSelectedTab] = useState('Color');

  useEffect(() => {
    if (project) {
      dispatch(setCurrentProject(projectName));
      setEditedProject(project);
    }
  }, [project, projectName, dispatch]);

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Project not found</div>;
  }

  const handleInputChange = (field, value) => {
    setEditedProject({
      ...editedProject,
      [field]: value
    });
  };

  const handleSave = () => {
    dispatch(updateProject(editedProject));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Color':
        return <Colors colors={editedProject.colors} onChange={handleInputChange} />;
      case 'Spacing':
        return <Spacing spacing={editedProject.spacing} onChange={handleInputChange} />;
      case 'Radius':
        return <Radius radius={editedProject.radius} onChange={handleInputChange} />;
      case 'Components':
        return <Components colors={editedProject.colors} components={editedProject.components} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-4">{project.name}</h2>
      <ProjectNavbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        {renderTabContent()}
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Project;
