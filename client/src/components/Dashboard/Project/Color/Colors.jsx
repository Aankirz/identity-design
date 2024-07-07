import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColors } from '../../../../store/projectSlice';
import ColorSidebar from './ColorSidebar';
import ColorContent from './ColorContent';
import tinycolor from 'tinycolor2';
import { useParams } from 'react-router-dom';

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

const Colors = ({ onChange }) => {
  const dispatch = useDispatch();
  const { projectName } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const project = projects.find(p => p.name === projectName);
  const initialColors = project ? project.colors : {};

  const [selectedCategory, setSelectedCategory] = useState('Primary');
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setColors(initialColors);
  }, [initialColors]);

  const handleColorChange = (category, index, field, value) => {
    const updatedColors = { 
      ...colors, 
      [category]: colors[category].map((color, i) => 
        i === index ? { ...color, [field]: value } : color
      )
    };

    if (field === 'value' && index === 0) {
      const gradientColors = generateGradientColors(value, 10);
      updatedColors[category] = updatedColors[category].map((color, i) => 
        i > 0 ? { ...color, value: gradientColors[i - 1] } : color
      );
    }

    setColors(updatedColors);
    dispatch(updateColors({ projectName, colors: updatedColors }));
    onChange('colors', updatedColors); // Update the parent component state
  };

  return (
    <div className="flex">
      <ColorSidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <ColorContent category={selectedCategory} colors={colors[selectedCategory]} onColorChange={handleColorChange} />
    </div>
  );
};

export default Colors;
