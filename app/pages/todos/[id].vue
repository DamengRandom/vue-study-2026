<script setup lang="ts">
import { ref, computed } from 'vue';
import { todoApi } from '~~/app/composables/useTodos';
import TodoEditForm from '~~/app/components/TodoEditForm.vue';

const route = useRoute();
const showEdit = ref(false);

const id = computed(() => {
  const param = route.params.id;
  return Number(Array.isArray(param) ? param[0] : param);
});

const { data: todo, isPending, isError } = todoApi.useTodo(id.value);
const { data: todoTitle } = todoApi.useTodoTitleHead(id.value);
// const { data: todo, isPending, isError } = useTodo(id);
// const { data: todoTitle } = useTodoTitleHead(id);

useHead(() => ({
  title: todoTitle.value
}));

const toggleEdit = () => {
  showEdit.value = !showEdit.value;
};

const handleUpdated = () => {
  showEdit.value = false;
};
</script>

<template>
  <main class="todo-detail-container">
    <nav class="breadcrumb">
      <NuxtLink to="/" class="back-link">
        <span class="icon">←</span> Back to list
      </NuxtLink>
    </nav>

    <div v-if="isPending" class="status-msg">
      <div class="loader"></div>
      Loading todo details...
    </div>
    <div v-else-if="isError" class="status-msg error">
      Failed to load todo. Please try again later.
    </div>
    <div v-else-if="!todo" class="status-msg">
      Todo not found.
    </div>
    <div v-else class="content-wrapper">
      <div v-if="!showEdit" class="todo-card">
        <header class="card-header">
          <span class="badge" :class="{ completed: todo.completed }">
            {{ todo.completed ? 'Completed' : 'Pending' }}
          </span>
          <h1 class="todo-title">{{ todo.title }}</h1>
        </header>
        
        <div class="card-body">
          <div class="info-row">
            <span class="label">Todo ID</span>
            <span class="value">#{{ todo.id }}</span>
          </div>
          <div class="info-row">
            <span class="label">Assigned User</span>
            <span class="value">User {{ todo.userId }}</span>
          </div>
        </div>

        <footer class="card-footer">
          <button @click="toggleEdit" class="btn-edit">
            Edit Task
          </button>
        </footer>
      </div>

      <TodoEditForm 
        v-else 
        :todo="todo" 
        @updated="handleUpdated" 
        @cancel="toggleEdit" 
      />
    </div>
  </main>
</template>
