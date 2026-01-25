<script setup lang="ts">
import { ToastProvider, ToastRoot, ToastViewport, ToastTitle, ToastDescription, ToastClose } from 'reka-ui'
import { useToast } from '../../composables/useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <ToastProvider>
    <ToastViewport class="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 p-6 max-w-[100vw] m-0 list-none outline-none">
      <ToastRoot
        v-for="toast in toasts"
        :key="toast.id"
        class="bg-white rounded-md shadow-lg p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-swipeOut"
        :duration="toast.duration || 5000"
        @update:open="(isOpen) => !isOpen && remove(toast.id)"
      >
        <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-[15px] text-slate-900">
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription class="[grid-area:_description] m-0 text-slate-500 text-[13px] leading-[1.3]">
          {{ toast.description }}
        </ToastDescription>
        <ToastClose class="[grid-area:_action]" as-child>
          <button class="inline-flex items-center justify-center p-1 rounded-full text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
            <span class="sr-only">Close</span>
            x
          </button>
        </ToastClose>
      </ToastRoot>
    </ToastViewport>
  </ToastProvider>
</template>
