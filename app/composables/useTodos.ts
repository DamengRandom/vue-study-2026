import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Todo } from "~~/server/ts-rest/todos-contract";

export const useTodos = () => {
  const { $trpcClient } = useNuxtApp();

  return useQuery({
    queryKey: ['todos'],
    queryFn: () => $trpcClient.todos.query(),
  });
}

export const useTodo = (id: number) => {
  const { $trpcClient } = useNuxtApp();

  return useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const todos = await $trpcClient.todos.query();
      return (todos as Todo[]).find((t: Todo) => t.id === id) ?? null;
    },
    enabled: computed(() => !isNaN(id)),
  });
}

export const useUpdateTodo = () => {
  const { $trpcClient } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: number; title: string; completed: boolean }) =>
      $trpcClient.updateTodo.mutate(variables),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
    },
  });
}
