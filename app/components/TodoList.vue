<script setup lang="ts">
import { useTodos } from '~~/app/composables/useTodos';

const { data: todos, isPending, isError } = useTodos();

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
      <li v-for="todo in todos" :key="todo.id">
        <button type="button" @click="goToTodo(todo.id)">
          {{ todo.title }}
        </button>
      </li>
    </ul>
  </section>
</template>
