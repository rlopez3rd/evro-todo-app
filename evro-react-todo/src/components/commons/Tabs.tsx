import { useState } from 'react';
import { cn } from '@/utils/cn';

interface TabsProps {
  tabs: string[];
  onTabChange: (activeTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="my-4 flex border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={cn(
            'flex-1 text-center py-2 font-semibold transition-all',
            activeTab === tab
              ? 'text-black border-b-2 border-orange-600'
              : 'text-gray-400'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
