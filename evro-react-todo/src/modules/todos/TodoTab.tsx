import TodoInput from '@/modules/todos/TodoInput';
import TodoList from '@/modules/todos/TodoList';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  useGetTodoScroll,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
  useClearCompletedTodos,
} from '@/modules/todos/hooks';

interface TodoContent {
  todoType: string;
}

const TodoTab: React.FC<TodoContent> = ({ todoType }) => {
  const { mutateCreateTodo } = useCreateTodo();
  const { mutateUpdateTodo } = useUpdateTodo();
  const { mutateDeleteTodo } = useDeleteTodo();
  const { mutateClearCompletedTodos } = useClearCompletedTodos();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTodoScroll(todoType);

  const todos = data?.pages.flatMap((page) => page.data) || [];

  const updateTodo = (todo: any) => {
    mutateUpdateTodo(todo);
  };

  const deleteTodo = (id: number) => {
    mutateDeleteTodo(id);
  };

  const onClearTodos = (todoIds: number[]) => {
    mutateClearCompletedTodos({ todo_ids: todoIds });
  };

  const createTodo = (text: any) => {
    const todo = {
      text: text,
      type: todoType.toLowerCase(),
    };
    mutateCreateTodo(todo);
  };

  return (
    <>
      <div className="px-5 py-2 h-[700px]">
        <TodoInput className="mx-auto w-5/6 my-6" onAdd={createTodo} />

        <div
          className={`transition-all duration-300 ${
            todos.length > 0 ? 'opacity-100 scale-100' : 'opacity-100 scale-95'
          }`}
        >
          {todos.length > 0 ? (
            <div
              id="scrollableDiv"
              className="h-[500px] overflow-auto transition-all ease-in"
            >
              <InfiniteScroll
                dataLength={todos.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<p>Loading...</p>}
                scrollableTarget="scrollableDiv"
              >
                <TodoList
                  list={todos}
                  onUpdateTodo={updateTodo}
                  onDeleteTodo={deleteTodo}
                  onClearTodos={onClearTodos}
                />
              </InfiniteScroll>

              {isFetchingNextPage && <p>Loading more...</p>}
            </div>
          ) : (
            <div className="">Empty todo list</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoTab;
