import React, { useState } from 'react';
import ColorSidebar from './ColorSidebar';
import ColorContent from './ColorContent';
import tinycolor from 'tinycolor2';

const generateGradientColors = (baseColor, count) => {
  const color = tinycolor(baseColor);
  const lightColors = [];
  const darkColors = [];
  const step = 20 / (count / 2); // Adjust step size to get better distribution of colors
  for (let i = 1; i <= count / 2; i++) {
    lightColors.push(color.clone().lighten(step * i).toHexString());
    darkColors.push(color.clone().darken(step * i).toHexString());
  }
  return [...lightColors.reverse(), ...darkColors];
};

const initialColors = {
  Primary: [{ label: 'Primary', value: '#009FF5' }, ...generateGradientColors('#009FF5', 10).map((shade, i) => ({
    label: `Primary${i + 1}`,
    value: shade,
  }))],
  Secondary: [{ label: 'Secondary', value: '#AAB9C5' }, ...generateGradientColors('#AAB9C5', 10).map((shade, i) => ({
    label: `Secondary${i + 1}`,
    value: shade,
  }))],
  Neutrals: [],
  Success: [],
  Warning: [],
  Error: [],
};

const Colors = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('Primary');
  const [colors, setColors] = useState(initialColors);

  const handleColorChange = (category, index, field, value) => {
    const updatedColors = { ...colors };
    updatedColors[category][index][field] = value;
    setColors(updatedColors);
    onChange(updatedColors);
  };

  return (
    <div className="flex">
      <ColorSidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <ColorContent category={selectedCategory} colors={colors[selectedCategory]} onColorChange={handleColorChange} />
    </div>
  );
};

export default Colors;
