<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

const { $trpcClient } = useNuxtApp() as any;
const route = useRoute();

const id = computed(() => {
  const param = route.params.id;
  return Number(Array.isArray(param) ? param[0] : param);
});

const { data, isPending, isError } = useQuery({
  queryKey: ['todo', id],
  queryFn: async () => {
    const todos = await $trpcClient.todos.query();
    return (todos as any[]).find((t: any) => t.id === id.value) ?? null;
  },
  enabled: computed(() => !isNaN(id.value)),
});
</script>

<template>
  <main>
    <NuxtLink to="/">Back to list</NuxtLink>

    <div v-if="isPending">Loading todo...</div>
    <div v-else-if="isError">Failed to load todo.</div>
    <div v-else-if="!data">Todo not found.</div>
    <div v-else>
      <h1>{{ data.title }}</h1>
      <p>ID: {{ data.id }}</p>
      <p>User ID: {{ data.userId }}</p>
      <p>Completed: {{ data.completed ? 'Yes' : 'No' }}</p>
    </div>
  </main>
</template>
