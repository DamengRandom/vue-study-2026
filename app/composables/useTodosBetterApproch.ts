import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import type { Todo } from "~~/server/ts-rest/todos-contract";

export const useTodos = () => {
	const { $trpcClient } = useNuxtApp();

	return useQuery({
		queryKey: ['todos'],
		queryFn: () => $trpcClient.todos.query(),
	});
}

export const useTodo = (id: MaybeRefOrGetter<number>) => {
	const { $trpcClient } = useNuxtApp();

	return useQuery(computed(() => {
		const todoId = toValue(id);
		return {
			queryKey: ['todo', todoId],
			queryFn: async () => {
				const todos = await $trpcClient.todos.query();
				return (todos as Todo[]).find((t: Todo) => t.id === todoId) ?? null;
			},
			enabled: !isNaN(todoId),
		};
	}));
}

export const useTodoTitleHead = (id: MaybeRefOrGetter<number>) => {
	const { $trpcClient } = useNuxtApp();

	return useQuery(computed(() => {
		const todoId = toValue(id);
		return {
			queryKey: ['todo-title-head', todoId],
			queryFn: async () => {
				const todos = await $trpcClient.todos.query();
				return (todos as Todo[]).find((t: Todo) => t.id === todoId) ?? null;
			},
			select: (todo: Todo | null) => todo?.title ?? '-',
			enabled: !isNaN(todoId),
			// Reason:
			// If a user goes to a URL like /todos/abc, your id computed will result in NaN.
			// Without enabled: Vue Query will trigger the 
			// queryFn
			// The code will make a network request to the server, fetch all todos, and then find nothing because id is NaN. This is a wasted network request.
			// With enabled: Vue Query sees the ID is invalid and stays in an idle state. No network request is made.
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
			queryClient.invalidateQueries({ queryKey: ['todos'] });
			queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
			queryClient.invalidateQueries({ queryKey: ['todo-title-head', variables.id] });
		},
	});
}

// AI note:
 
// Since you are using a Factory Pattern (todoQueries.detail), the values in the factory are "calculated" once per call. To make those calculations reactive, you must use a computed or a getter function.

// Recommendation: Stick with computed. It is the clearest way to signal to other developers: "This whole configuration object is dynamic and will update when dependencies change."