<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useNuxtApp } from '#app';

const { $trpcClient } = useNuxtApp() as any;

const { data, isPending, isError } = useQuery({
  queryKey: ['todos'],
  queryFn: () => $trpcClient.todos.query(),
});

const topTodos = computed(() => {
  return (data.value ?? []).slice(0, 10);
});

const goToTodo = (id: number) => {
  navigateTo(`/todos/${id}`);
};
</script>

<template>
  <section>
    <h1>Top 10 todos</h1>
    <div v-if="isPending">Loading todos...</div>
    <div v-else-if="isError">Failed to load todos.</div>
    <ul v-else>
      <li v-for="todo in topTodos" :key="todo.id">
        <button type="button" @click="goToTodo(todo.id)">
          {{ todo.title }}
        </button>
      </li>
    </ul>
  </section>
</template>
