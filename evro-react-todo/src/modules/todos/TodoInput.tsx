import { cn } from '@/utils/cn';
import { useState } from 'react';

interface TodoInputProps {
  className?: string;
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ className, onAdd }) => {
  const [value, setValue] = useState<string>('');

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <div
      className={cn(
        'flex items-center rounded-full overflow-hidden border border-gray-300 w-full bg-cs-primary',
        className
      )}
    >
      <input
        type="text"
        placeholder="What do you need to do?"
        className="flex-grow px-4 py-4 min-w-3 text-gray-600 bg-transparent focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className={cn(
          'bg-cs-secondary text-white px-6 py-4 rounded-r-full',
          'hover:bg-cs-secondary/80 transition-all',
          'disabled:cursor-not-allowed'
        )}
        disabled={!value.trim()}
      >
        ADD
      </button>
    </div>
  );
};

export default TodoInput;
