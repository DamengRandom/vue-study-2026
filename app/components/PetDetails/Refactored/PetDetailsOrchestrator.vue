<script setup lang="ts">
import { useRouter } from '#app'
import Button from '../../ui/Button.vue' // Adjusted path
import Toaster from '../../ui/Toaster.vue' // Adjusted path
import { useToast } from '../../../composables/useToast' // Adjusted path
import { useForm } from '@tanstack/vue-form'
import { nextTick, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import AboutSection from '../../PetSubForm/AboutSection.vue'
import HealthDietSection from '../../PetSubForm/HealthDietSection.vue'
import WeightActivitySection from '../../PetSubForm/WeightActivitySection.vue'
import { PetProfileFormSchema, type PetFormValues, type GetAnimalByIdOutput } from './types'

const props = defineProps<{
  animal: GetAnimalByIdOutput
  customerId: string
}>()

const isEditing = ref(false)
const { success, error, clear } = useToast()
const router = useRouter()
const cancelButtonRef = useTemplateRef<HTMLButtonElement>('cancel-button')
const editButtonRef = useTemplateRef<HTMLButtonElement>('edit-button')

/**
 * INITIAL STATE
 * (EXAMPLE ONLY ⚠️) In a real app, this would come from a query or props.
 */
const defaultValues: PetFormValues = reactive({
  about: {
    name: props.animal.name || 'Winston',
    gender: 'Boy',
    primaryBreed: 'Sheepdog',
    age: '13 years, 2 months',
  },
  weightActivity: {
    weightKg: '25',
    bodyCondition: 'Ideal',
    activityLevel: 'Active',
  },
  healthDiet: {
    fussiness: 'Low',
    intolerances: 'None',
    healthConcerns: 'Joints',
  },
})

const form = useForm({
  defaultValues,
  validators: {
    onBlur: PetProfileFormSchema,
  },
  onSubmit: async ({ value, formApi }) => {
    clear()

    try {
      console.log('Submitting pet profile orchestrated form (Orchestrator):', value)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      isEditing.value = false
      
      formApi.reset(value)
      
      success('Pet profile updated successfully')
    } catch (err) {
      error('Failed to update pet profile')
    }
  },
})

/**
 * ORCHESTRATION LOGIC (Cross-section communication)
 * Example: If breed changes to "Great Dane", update weight to "60" automatically.
 */
onMounted(() => {
  // Example: We watch 'about.primaryBreed' changes using form.useStore()
  const breedRef = form.useStore((state) => state.values.about.primaryBreed)

  watch(breedRef, (newBreed) => {
    if (newBreed.toLowerCase() === 'great dane') {
      console.log('Orchestrator: Breed changed to Great Dane. Adjusting weight...')

      form.setFieldValue('weightActivity.weightKg', '60')
    }

    // Example 2: Auto-trigger validation in ANOTHER subform
    // If we switch to Chihuahua, we want the Weight field to re-validate immediately
    // against the new breed constraints defined in types.ts
    if (newBreed.toLowerCase() === 'chihuahua') {
      console.log('Orchestrator: Breed changed to Chihuahua. Re-validating Weight field...')

      form.validateField('weightActivity.weightKg', 'change')
    }
  })
})

const startEdit = async () => {
  isEditing.value = true

  await nextTick();
  
  (cancelButtonRef.value as any)?.$el?.focus?.()
}


const cancelEdit = async () => {
  isEditing.value = false
  form.reset()
  clear()

  await nextTick();
  
  (editButtonRef.value as any)?.$el?.focus?.()
}

const handleRemovePet = () => {
  if (confirm('Are you sure you want to remove this pet?')) {
    router.push(`/customers/${props.customerId}`)
  }
}
</script>

<template>
  <Toaster />

  <form @submit.prevent="form.handleSubmit" class="relative">
    <!-- Header Buttons (Control Level) -->
    <div class="absolute -top-16 right-0">
      <template v-if="isEditing">
        <form.Subscribe>
          <template #default="{ isSubmitting, isDirty }">
            <Button
              ref="cancel-button"
              :disabled="isSubmitting"
              class="mr-3 ml-auto"
              tone="primary"
              variant="ghost"
              @click="cancelEdit"
            >
              Cancel
            </Button>
            <Button :disabled="!isDirty" :busy="isSubmitting" type="submit">Save</Button>
          </template>
        </form.Subscribe>
      </template>
      <template v-else>
        <Button ref="edit-button" variant="outline" @click="startEdit">Edit</Button>
      </template>
    </div>

    <!-- Main Content (Composition Level) -->
    <div class="flex flex-col gap-8">
      <!-- Subforms receiving the parent form instance -->
      <AboutSection :form="form" :is-editing="isEditing" />

      <WeightActivitySection :form="form" :is-editing="isEditing" />

      <HealthDietSection :form="form" :is-editing="isEditing" />

      <!-- Danger Zone -->
      <div v-if="isEditing" class="flex flex-col items-start gap-2 border-t pt-4">
        <h2 class="text-lg text-admin-red-900 font-bold">Danger zone</h2>
        <Button variant="outline" tone="danger" @click="handleRemovePet">Remove pet</Button>
      </div>
    </div>
  </form>
</template>
