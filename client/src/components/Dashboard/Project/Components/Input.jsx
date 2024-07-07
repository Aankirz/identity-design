import React from 'react';

const Input = ({ colors }) => {
  const primaryColors = colors.Primary || [{ value: '#009FF5' }];
  const secondaryColors = colors.Secondary || [{ value: '#AAB9C5' }];

  return (
    <div>
      <h3 className="text-xl mb-4">Inputs</h3>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Primary</h4>
        <div className="space-y-4">
          {primaryColors.map((color, index) => (
            <div key={index} className="mb-4">
              <textarea
                className="p-2 border rounded w-[50vw]"
                style={{ borderColor: color.value }}
                placeholder={`Input ${index + 1}`}
              ></textarea>
              <button
                className="w-[50vw] mt-2 p-2 rounded text-white"
                style={{ backgroundColor: color.value }}
              >
                Send message
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg mb-2">Secondary</h4>
        <div className="space-y-4">
          {secondaryColors.map((color, index) => (
            <div key={index} className="mb-4">
              <textarea
                className="p-2 border rounded w-[50vw]"
                style={{ borderColor: color.value }}
                placeholder={`Input ${index + 1}`}
              ></textarea>
              <button
                className="w-[50vw] mt-2 p-2 rounded text-white"
                style={{ backgroundColor: color.value }}
              >
                Send message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Input;
