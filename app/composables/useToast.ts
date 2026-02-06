import { ref } from 'vue'

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const add = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    toasts.value.push(newToast)

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        remove(id)
      }, toast.duration || 5000)
    }

    return id
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string) => {
    add({ title: 'Success', description: message, type: 'success' })
  }

  const error = (message: string) => {
    add({ title: 'Error', description: message, type: 'error' })
  }

  const clear = () => {
    toasts.value = []
  }

  return {
    toasts,
    add,
    remove,
    success,
    error,
    clear
  }
}
