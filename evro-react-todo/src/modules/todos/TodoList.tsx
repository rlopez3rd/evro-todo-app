import { useState } from 'react';
import { cn } from '@/utils/cn';
import {
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
  ArchiveBoxXMarkIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

import IconButton from '@/components/commons/IconButton';

interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
}

interface TodoListProps {
  list: Todo[];
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
  onClearTodos: (todos: number[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  list,
  onUpdateTodo,
  onDeleteTodo,
  onClearTodos,
}) => {
  const [modifiedTodos, setModifiedTodos] = useState<{ [id: number]: string }>(
    {}
  );

  const toggleComplete = (item: Todo) => {
    onUpdateTodo({ ...item, isComplete: !item.isComplete });
  };

  const startEditTodo = (item: Todo) => {
    setModifiedTodos((prev) => ({ ...prev, [item.id]: item.text }));
  };

  const cancelEditTodo = (id: number) => {
    setModifiedTodos((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const saveEditTodo = (item: Todo) => {
    if (modifiedTodos[item.id]?.trim() !== '') {
      onUpdateTodo({ ...item, text: modifiedTodos[item.id] });
    }
    cancelEditTodo(item.id);
  };

  const removeEditTodo = (id: number) => {
    onDeleteTodo(id);
  };

  const clearCompleted = () => {
    const completedTodos = list
      .filter((item) => item.isComplete)
      .map((item) => item.id);
    onClearTodos(completedTodos);
  };

  const hasCompletedTodos = list.some((item) => item.isComplete);

  return (
    <>
      {list.length === 0 ? (
        <div className="transition ease-linear h-80 grid place-content-center">
          <div className="text-slate-500">Empty todo list</div>
        </div>
      ) : (
        <div className="transition ease-linear mx-auto w-5/6 h-[70%] my-2 rounded-2xl bg-cs-primary px-2">
          <div className="h-[85%] overflow-hidden overflow-y-auto">
            {list.map((item) => {
              const isEditing = modifiedTodos.hasOwnProperty(item.id);
              const isEmpty = modifiedTodos[item.id]?.trim() === '';

              return (
                <div
                  key={item.id}
                  className="flex justify-center items-center py-4 px-3"
                >
                  <button
                    disabled={isEditing}
                    className={cn(
                      'rounded-full border-none hover:opacity-50',
                      isEditing
                        ? 'hover:cursor-not-allowed'
                        : 'hover:cursor-pointer'
                    )}
                    onClick={() => toggleComplete(item)}
                  >
                    {item.isComplete ? (
                      <CheckCircleIcon className="size-8 text-orange-600" />
                    ) : (
                      <div className="w-6 h-6 m-1 flex justify-center rounded-full border-2 border-gray-500"></div>
                    )}
                  </button>
                  <div className="w-full relative mx-1">
                    <input
                      name="text"
                      readOnly={!isEditing}
                      type="text"
                      placeholder="Type here"
                      className={cn(
                        'w-full px-3 py-2 mx-3 my-2',
                        isEditing
                          ? 'rounded-md focus:outline-none focus:outline-1 focus:outline-black'
                          : 'bg-inherit border-b-2 border-gray-300 focus:outline-none',
                        item.isComplete &&
                          !isEditing &&
                          'line-through text-gray-400 ',
                        !isEditing && 'pointer-events-none'
                      )}
                      value={isEditing ? modifiedTodos[item.id] : item.text}
                      onChange={(e) =>
                        setModifiedTodos((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                    />
                    {isEmpty && (
                      <div className="absolute left-5 text-sm text-red-700">
                        Input is required
                      </div>
                    )}
                  </div>
                  <div className="mx-3 flex">
                    {isEditing ? (
                      <>
                        <IconButton
                          disabled={isEmpty}
                          onClick={() => saveEditTodo(item)}
                        >
                          <CheckIcon className="size-6 text-green-700" />
                        </IconButton>
                        <IconButton onClick={() => cancelEditTodo(item.id)}>
                          <XMarkIcon className="size-6 text-red-700" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => startEditTodo(item)}>
                          <PencilIcon className="size-6" />
                        </IconButton>

                        <IconButton onClick={() => removeEditTodo(item.id)}>
                          <TrashIcon className="size-6 text-red-700" />
                        </IconButton>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end p-4">
            {hasCompletedTodos && (
              <IconButton
                className="flex items-center w-100 text-orange-600"
                onClick={clearCompleted}
              >
                <div>
                  <ArchiveBoxXMarkIcon className="size-6"></ArchiveBoxXMarkIcon>
                </div>
                <div>Clear Completed</div>
              </IconButton>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
