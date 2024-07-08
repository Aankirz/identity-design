import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Button = ({ variant, size, colorKey }) => {
  const projects = useSelector((state) => state.projects.projects);
  const currentProjectName = useSelector((state) => state.projects.currentProjectName);
  const project = projects.find(p => p.name === currentProjectName);
  const projectColors = project ? project.colors : {};
  const colors = projectColors[colorKey] || [];

  const [showCustomization, setShowCustomization] = useState(false);
  const [customizationIndex, setCustomizationIndex] = useState(null);
  const [customStyles, setCustomStyles] = useState({ paddingX: '', paddingY: '', borderRadius: '', textColor: '' });

  const handleButtonClick = (index) => {
    setCustomizationIndex(index);
    setShowCustomization(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomStyles({ ...customStyles, [name]: value });
  };

  const handleApply = () => {
    setShowCustomization(false);
  };

  const handleReset = () => {
    setCustomStyles({ paddingX: '', paddingY: '', borderRadius: '', textColor: '' });
    setShowCustomization(false);
  };

  const getSizeClass = (size) => {
    const paddingX = customStyles.paddingX || (size === 'sm' ? '8' : size === 'md' ? '16' : '24');
    const paddingY = customStyles.paddingY || (size === 'sm' ? '4' : size === 'md' ? '8' : '12');
    const borderRadius = customStyles.borderRadius || '4';
    const textColor = customStyles.textColor || '#ffffff';

    return {
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: `${borderRadius}px`,
      color: textColor,
    };
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            className="rounded"
            style={{ backgroundColor: color.value, ...getSizeClass(size) }}
            onClick={() => handleButtonClick(index)}
          >
            Continue
          </button>
        ))}
      </div>

      {showCustomization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowCustomization(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Customize Button</h2>
            <form>
              <label className="block mb-2">
                Padding X (px):
                <input
                  type="number"
                  name="paddingX"
                  value={customStyles.paddingX}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </label>
              <label className="block mb-2">
                Padding Y (px):
                <input
                  type="number"
                  name="paddingY"
                  value={customStyles.paddingY}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </label>
              <label className="block mb-2">
                Border Radius (px):
                <input
                  type="number"
                  name="borderRadius"
                  value={customStyles.borderRadius}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </label>
              <label className="block mb-2">
                Text Color (hex):
                <input
                  type="text"
                  name="textColor"
                  value={customStyles.textColor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </label>
              <button
                type="button"
                onClick={handleApply}
                className="w-full bg-blue-500 text-white p-2 rounded mb-2"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-red-500 text-white p-2 rounded"
              >
                Reset to Default
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
