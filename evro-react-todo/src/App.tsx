import '@/App.css';

import TodoPage from './modules/todos/TodoPage';

const App = () => {
  return (
    <div className="min-w-[500px] h-vh grid place-items-center">
      <TodoPage />
    </div>
  );
};

export default App;
