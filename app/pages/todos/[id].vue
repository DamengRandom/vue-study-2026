<script setup lang="ts">
import { computed } from 'vue';
import { useTodo } from '~~/app/composables/useTodos';

const route = useRoute();

const id = computed(() => {
  const param = route.params.id;
  return Number(Array.isArray(param) ? param[0] : param);
});

const { data: todo, isPending, isError } = useTodo(id.value);
</script>

<template>
  <main>
    <NuxtLink to="/">Back to list</NuxtLink>

    <div v-if="isPending">Loading todo...</div>
    <div v-else-if="isError">Failed to load todo.</div>
    <div v-else-if="!todo">Todo not found.</div>
    <div v-else>
      <h1>{{ todo.title }}</h1>
      <p>ID: {{ todo.id }}</p>
      <p>User ID: {{ todo.userId }}</p>
      <p>Completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
    </div>
  </main>
</template>
