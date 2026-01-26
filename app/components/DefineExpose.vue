<script setup lang="ts">
import { ref } from 'vue';

const searchTerm = ref('');

const rest = () => {
  searchTerm.value = '';
}

defineExpose({
  rest
});
</script>

<template>
  <input 
    v-model="searchTerm" 
    placeholder="Search ..." 
    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</template>
