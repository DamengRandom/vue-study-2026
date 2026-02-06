<script setup lang="ts">
  import { ref } from 'vue';
  import DefineExpose from './DefineExpose.vue';

  const inputRef = ref<InstanceType<typeof DefineExpose> | null>(null);

  const clearChildInput = () => {
    inputRef.value?.rest();
  }
</script>

<template>
    <div class="p-8 space-y-4">
      <DefineExpose ref="inputRef" />
      <button 
        @click="clearChildInput"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Clear Search from Parent
      </button>
    </div>
</template>
