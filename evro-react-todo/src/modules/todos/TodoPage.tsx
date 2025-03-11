import { useState } from 'react';

import Tabs from '@/components/commons/Tabs';
import TodoTab from '@/modules/todos/TodoTab';

import Logo from '@/assets/logo.png';

const tabs = ['Personal', 'Professional'];

const TodoHeader = () => {
  return (
    <div className="h-[100px] bg-cs-primary text-3xl p-5">
      <img className={'mx-auto'} src={Logo} alt="" />
    </div>
  );
};

const TodoPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onTabChange = (tab: string) => {
    setActiveTab(tab.toLowerCase());
  };
  return (
    <>
      <div className="max-w-[800px] w-3/4 h-[800px] my-3 rounded-2xl shadow-md overflow-hidden">
        <TodoHeader />
        <Tabs tabs={tabs} onTabChange={onTabChange}></Tabs>
        <TodoTab todoType={activeTab} />
      </div>
    </>
  );
};

export default TodoPage;
