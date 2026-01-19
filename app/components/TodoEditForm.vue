<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Todo } from '~~/server/ts-rest/todos-contract';
import { useUpdateTodo } from '~~/app/composables/useTodos';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: 'updated', todo: Todo): void;
  (e: 'cancel'): void;
}>();

const title = ref(props.todo.title);
const completed = ref(props.todo.completed);

const { mutate, isPending, isError, error } = useUpdateTodo();

const handleSubmit = () => {
  mutate({
    id: props.todo.id,
    title: title.value,
    completed: completed.value,
  }, {
    onSuccess: (data) => {
      emit('updated', data as Todo);
    }
  });
};

watchEffect(() => {
  title.value = props.todo.title;
  completed.value = props.todo.completed;
});
</script>

<template>
  <div class="edit-form-container">
    <form @submit.prevent="handleSubmit" class="edit-form">
      <h3>Edit Todo</h3>
      
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          id="title" 
          v-model="title" 
          type="text" 
          required 
          placeholder="Enter todo title"
          :disabled="isPending"
        />
      </div>

      <div class="form-group checkbox">
        <label>
          <input 
            v-model="completed" 
            type="checkbox" 
            :disabled="isPending"
          />
          Mark as completed
        </label>
      </div>

      <div v-if="isError" class="error-message">
        {{ error?.message || 'Failed to update todo' }}
      </div>

      <div class="form-actions">
        <button 
          type="button" 
          class="btn-secondary" 
          @click="emit('cancel')"
          :disabled="isPending"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="btn-primary" 
          :disabled="isPending"
        >
          {{ isPending ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>
