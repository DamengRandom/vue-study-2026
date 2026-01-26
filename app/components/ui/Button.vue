<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'solid' | 'outline' | 'ghost'
  tone?: 'primary' | 'danger' | 'neutral'
  disabled?: boolean
  busy?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const classes = computed(() => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4"
  
  let variantClass = ""
  const isDanger = props.tone === 'danger'
  
  if (props.variant === 'ghost') {
    variantClass = "hover:bg-accent hover:text-accent-foreground"
    if (isDanger) variantClass += " text-red-600 hover:bg-red-50 hover:text-red-700"
  } else if (props.variant === 'outline') {
    variantClass = "border border-input hover:bg-accent hover:text-accent-foreground"
    if (isDanger) variantClass += " border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
  } else {
    // Solid default
    variantClass = "bg-primary text-primary-foreground hover:bg-primary/90 bg-black text-white"
    if (isDanger) variantClass = "bg-red-600 text-white hover:bg-red-700"
  }
  
  return `${base} ${variantClass}`
})
</script>

<template>
  <button :type="type || 'button'" :class="classes" :disabled="disabled || busy">
    <span v-if="busy" class="mr-2">...</span>
    <slot />
  </button>
</template>
