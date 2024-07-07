import React from 'react';

const components = ['Button', 'Input', 'Radio', 'Checkbox'];

const ComponentSidebar = ({ selectedComponent, onSelectComponent }) => {
  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
      <h3 className="text-xl font-semibold mb-4">COMPONENTS</h3>
      <ul>
        {components.map(component => (
          <li key={component} className="mb-2">
            <button
              className={`w-full text-left p-2 rounded ${selectedComponent === component ? 'bg-blue-100' : ''}`}
              onClick={() => onSelectComponent(component)}
            >
              {component}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentSidebar;
