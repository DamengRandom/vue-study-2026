import { useQuery } from "@tanstack/vue-query";
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
