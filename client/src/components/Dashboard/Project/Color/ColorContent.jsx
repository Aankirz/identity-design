import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';

const ColorContent = ({ category, colors, onColorChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(null);
  const pickerRef = useRef(null);

  const handleColorClick = (index) => {
    setDisplayColorPicker(displayColorPicker === index ? null : index);
  };

  const handleColorChange = (index, color) => {
    const hslColor = `hsl(${Math.round(color.hsl.h)}, ${Math.round(color.hsl.s * 100)}%, ${Math.round(color.hsl.l * 100)}%)`;
    onColorChange(category, index, 'value', hslColor);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setDisplayColorPicker(null);
    }
  };

  useEffect(() => {
    if (displayColorPicker !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayColorPicker]);

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl mb-4">{category}</h2>
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="p-4 border rounded-lg relative">
            <div
              className="w-full h-16 rounded-lg mb-2 cursor-pointer"
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorClick(index)}
            ></div>
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={color.label}
                onChange={(e) => onColorChange(category, index, 'label', e.target.value)}
                className="w-1/2 p-2 border rounded"
                placeholder="Label"
              />
              <input
                type="text"
                value={color.value}
                onChange={(e) => onColorChange(category, index, 'value', e.target.value)}
                className="w-1/2 ml-2 p-2 border rounded"
                placeholder="Color Value"
              />
            </div>
            {displayColorPicker === index && (
              <div className="absolute z-10" ref={pickerRef}>
                <SketchPicker
                  color={color.value}
                  onChange={(newColor) => handleColorChange(index, newColor)}
                  disableAlpha
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorContent;
