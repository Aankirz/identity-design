import React from 'react';
import { useSelector } from 'react-redux';

const Button = ({ variant, size, colorKey }) => {
  const projects = useSelector((state) => state.projects.projects);
  const currentProjectName = useSelector((state) => state.projects.currentProjectName);
  const project = projects.find(p => p.name === currentProjectName);
  const projectColors = project ? project.colors : {};
  const colors = projectColors[colorKey] || [];

  // Handle case where colors are undefined or empty
  if (!colors.length) {
    return <div>No colors found for {colorKey}</div>;
  }

  const getSizeClass = (size) => {
    switch (size) {
      case 'sm':
        return 'py-1 px-2 text-sm';
      case 'md':
        return 'py-2 px-4 text-md';
      case 'lg':
        return 'py-3 px-6 text-lg';
      default:
        return 'py-2 px-4 text-md';
    }
  };

  return (
    <div>
      {colors.map((color, index) => (
        <button
          key={index}
          className={`rounded ${getSizeClass(size)} text-white`}
          style={{ backgroundColor: color.value }}
        >
          Continue
        </button>
      ))}
    </div>
  );
};

export default Button;
