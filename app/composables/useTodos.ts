import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import type { Todo } from "~~/server/ts-rest/todos-contract";

// Shared fetch logic to keep the factory DRY
const fetchTodoById = async (id: number) => {
  const todos = await useNuxtApp().$trpcClient.todos.query();
  return (todos as Todo[]).find((t: Todo) => t.id === id) ?? null;
};

/**
 * Factory for Todo-related query options.
 * This centralizes query keys and fetch logic.
 */
export const todoQueries = {
  all: () => queryOptions({
    queryKey: ['todos'] as const,
    queryFn: () => useNuxtApp().$trpcClient.todos.query() as Promise<Todo[]>,
  }),
  detail: (id: number) => queryOptions({
    queryKey: ['todo', id] as const,
    queryFn: () => fetchTodoById(id),
  })
}

export const useTodos = () => {
  return useQuery(todoQueries.all());
}

export const useTodo = (id: MaybeRefOrGetter<number>) => {
  return useQuery(computed(() => {
    const todoId = toValue(id);
    return {
      ...todoQueries.detail(todoId),
      enabled: !isNaN(todoId),
    };
  }));
}

export const useTodoTitleHead = (id: MaybeRefOrGetter<number>) => {
  return useQuery(computed(() => {
    const todoId = toValue(id);
    return {
      queryKey: ['todo-title-head', todoId] as const,
      queryFn: () => fetchTodoById(todoId),
      select: (todo: Todo | null) => todo?.title ?? '-',
      enabled: !isNaN(todoId),
    };
  }));
}

export const useUpdateTodo = () => {
  const { $trpcClient } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: number; title: string; completed: boolean }) =>
      $trpcClient.updateTodo.mutate(variables),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all().queryKey });
      queryClient.invalidateQueries({ queryKey: todoQueries.detail(variables.id).queryKey });
      queryClient.invalidateQueries({ queryKey: ['todo-title-head', variables.id] });
    },
  });
}
