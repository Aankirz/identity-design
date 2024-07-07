import React from 'react';

const Radio = ({ colors }) => {
  const primaryColors = colors.Primary || [{ value: '#009FF5' }];
  const secondaryColors = colors.Secondary || [{ value: '#AAB9C5' }];

  return (
    <div>
      <h3 className="text-xl mb-4">Radios</h3>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Primary</h4>
        <div className="flex">
          {primaryColors.map((color, index) => (
            <label key={index} className="flex items-center mr-4">
              <input type="radio" name="primary" style={{ accentColor: color.value, width: '20px', height: '20px' }} />
              <span className="ml-2" style={{ color: 'black' }}>Option {index + 1}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Secondary</h4>
        <div className="flex">
          {secondaryColors.map((color, index) => (
            <label key={index} className="flex items-center mr-4">
              <input type="radio" name="secondary" style={{ accentColor: color.value, width: '20px', height: '20px' }} />
              <span className="ml-2" style={{ color: 'black' }}>Option {index + 1}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Radio;
