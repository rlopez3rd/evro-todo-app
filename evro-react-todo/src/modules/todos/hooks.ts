import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/api/api';

export const useGetTodoScroll = (todoType: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['TODOS_SCROLL', todoType],
      queryFn: async ({ pageParam }) => {
        const response = await api.get(`/todos`, {
          params: { page: pageParam, limit: 5, type: todoType.toLowerCase() },
        });
        return response.data.result;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasMore ? lastPage.meta.currentPage + 1 : undefined,
      staleTime: 0,
      refetchOnMount: true,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreateTodo } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post(`/todos`, payload);
      return response.data.result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['TODOS_SCROLL'],
      });
    },
  });

  return { mutateCreateTodo };
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateTodo } = useMutation({
    mutationFn: async (payload: any) => {
      console.log;
      const response = await api.put(`/todos/${payload.id}`, payload);
      return response.data.result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['TODOS_SCROLL'],
      });
    },
  });

  return { mutateUpdateTodo };
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteTodo } = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/todos/${id}`);
      return response.data.result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['TODOS_SCROLL'],
      });
    },
  });

  return { mutateDeleteTodo };
};

export const useClearCompletedTodos = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateClearCompletedTodos } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post(`/todos/clear-completed`, payload);
      return response.data.result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['TODOS_SCROLL'],
      });
    },
  });

  return { mutateClearCompletedTodos };
};
