import React from 'react';

const Checkbox = ({ colors }) => {
  const primaryColors = colors.Primary || [{ value: '#009FF5' }];
  const secondaryColors = colors.Secondary || [{ value: '#AAB9C5' }];

  return (
    <div>
      <h3 className="text-xl mb-4">Checkboxes</h3>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Primary</h4>
        <div className="flex flex-wrap">
          {primaryColors.map((color, index) => (
            <label key={index} className="flex items-center mr-4 mb-2">
              <input 
                type="checkbox" 
                style={{ accentColor: color.value, width: '24px', height: '24px' }} 
              />
              <span className="ml-2" style={{ color: 'black' }}>Option {index + 1}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Secondary</h4>
        <div className="flex flex-wrap">
          {secondaryColors.map((color, index) => (
            <label key={index} className="flex items-center mr-4 mb-2">
              <input 
                type="checkbox" 
                style={{ accentColor: color.value, width: '24px', height: '24px' }} 
              />
              <span className="ml-2" style={{ color: 'black' }}>Option {index + 1}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
