import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import type { Todo } from "~~/server/ts-rest/todos-contract";

// Shared fetch logic to keep the factory DRY
const fetchTodoById = async (id: number) => {
  const todos = await useNuxtApp().$trpcClient.todos.query();
  return (todos as Todo[]).find((t: Todo) => t.id === id) ?? null;
};

export const todoApi = {
  /**
   * Factory for Todo-related query options.
   * Centralizes query keys and fetch logic.
   */
  queries: {
    all: () => queryOptions({
      queryKey: ['todos'] as const,
      queryFn: () => useNuxtApp().$trpcClient.todos.query() as Promise<Todo[]>,
    }),
    detail: (id: number) => queryOptions({
      queryKey: ['todo', id] as const,
      queryFn: () => fetchTodoById(id),
    }),
    titleHead: (id: number) => queryOptions({
      queryKey: ['todo-title-head', id] as const,
      queryFn: () => fetchTodoById(id),
      select: (todo: Todo | null) => todo?.title ?? '-',
    })
  },

  // Composition API Hooks
  useTodos: () => {
    return useQuery(todoApi.queries.all());
  },

  useTodo: (id: MaybeRefOrGetter<number>) => {
    return useQuery(computed(() => {
      const todoId = toValue(id);
      return {
        ...todoApi.queries.detail(todoId),
        enabled: !isNaN(todoId),
      };
    }));
  },

  useTodoTitleHead: (id: MaybeRefOrGetter<number>) => {
    return useQuery(computed(() => {
      const todoId = toValue(id);
      return {
        ...todoApi.queries.titleHead(todoId),
        enabled: !isNaN(todoId),
      };
    }));
  },

  useUpdateTodo: () => {
    const { $trpcClient } = useNuxtApp();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (variables: { id: number; title: string; completed: boolean }) =>
        $trpcClient.updateTodo.mutate(variables),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: todoApi.queries.all().queryKey });
        queryClient.invalidateQueries({ queryKey: todoApi.queries.detail(variables.id).queryKey });
        queryClient.invalidateQueries({ queryKey: todoApi.queries.titleHead(variables.id).queryKey });
      },
    });
  }
};
