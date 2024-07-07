import React from 'react';

const categories = ['Primary', 'Secondary', 'Neutrals', 'Success', 'Warning', 'Error'];

const ColorSidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
      <h3 className="text-xl font-semibold mb-4">COLORS</h3>
      <ul>
        {categories.map(category => (
          <li key={category} className="mb-2">
            <button
              className={`w-full text-left p-2 rounded ${selectedCategory === category ? 'bg-blue-100' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorSidebar;
