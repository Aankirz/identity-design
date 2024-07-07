import React from 'react';

const tabs = [
  { name: 'Color', href: '#', current: true },
  { name: 'Spacing', href: '#', current: false },
  { name: 'Radius', href: '#', current: false },
  { name: 'Components', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProjectNavbar = ({ selectedTab, onTabSelect }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabSelect(tab.name)}
            className={classNames(
              tab.name === selectedTab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            )}
            aria-current={tab.current ? 'page' : undefined}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectNavbar;
