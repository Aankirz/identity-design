import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';
import Checkbox from './Checkbox';
import ComponentSidebar from './ComponentSidebar';

const Components = ({ colors }) => {
  const [selectedComponent, setSelectedComponent] = useState('Button');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Button':
        return (
          <>
            <h2 className="text-2xl mb-4">Buttons</h2>
            <div className="space-y-4">
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size}>
                  <h3 className="text-xl mb-2">Primary - {size}</h3>
                  <Button size={size} colorKey="Primary" colors={colors} />
                </div>
              ))}
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size}>
                  <h3 className="text-xl mb-2">Secondary - {size}</h3>
                  <Button size={size} colorKey="Secondary" colors={colors} />
                </div>
              ))}
            </div>
          </>
        );
      case 'Input':
        return (
          <>
            <h2 className="text-2xl mb-4">Inputs</h2>
            <Input colors={colors} />
          </>
        );
      case 'Radio':
        return (
          <>
            <h2 className="text-2xl mb-4">Radios</h2>
            <Radio colors={colors} />
          </>
        );
      case 'Checkbox':
        return (
          <>
            <h2 className="text-2xl mb-4">Checkboxes</h2>
            <Checkbox colors={colors} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <ComponentSidebar selectedComponent={selectedComponent} onSelectComponent={setSelectedComponent} />
      <div className="flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Components;
