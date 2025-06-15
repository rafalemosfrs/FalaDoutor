import { useState, useEffect } from 'react';

const TabPanel = ({ tabs, initialTab = 0, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === index
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeTab]?.content || null}
      </div>
    </div>
  );
};

export default TabPanel;
