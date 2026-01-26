<script setup lang="ts">
import { Label } from 'reka-ui'

defineProps<{
  modelValue?: string | number
  value?: string | number
  error?: string
  invalid?: boolean
  name?: string
  label?: string
  hiddenLabel?: boolean
  id?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'blur', event: FocusEvent): void
}>()

function handleInput(e: Event) {
  emit('input', e)
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <Label
      v-if="label && !hiddenLabel"
      :for="id || name"
      class="text-sm font-medium text-gray-700"
    >
      {{ label }}
    </Label>
    
    <div class="relative">
      <input
        :id="id || name"
        :name="name"
        :value="value ?? modelValue"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500"
        :class="[
          invalid || error ? 'border-red-500 focus:border-red-500' : ''
        ]"
        @input="handleInput"
        @blur="$emit('blur', $event)"
      />
      <div v-if="$slots['adornment-trailing']" class="absolute right-3 top-2.5">
        <slot name="adornment-trailing" />
      </div>
    </div>

    <span v-if="error" class="text-xs text-red-500 font-medium">{{ error }}</span>
  </div>
</template>
