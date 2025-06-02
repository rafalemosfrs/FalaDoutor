import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ExpandableCard = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card h-full">
      <div 
        className="flex items-center justify-between p-5 cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-primary-50">{icon}</span>}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'animate-expand' : 'animate-collapse h-0'
        }`}
      >
        {isExpanded && <div className="p-5">{children}</div>}
      </div>
    </div>
  );
};

export default ExpandableCard;