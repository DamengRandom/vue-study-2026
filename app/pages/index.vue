<script setup lang="ts">
import PetDetailsOrchestrator from '~/components/PetDetails/Refactored/PetDetailsOrchestrator.vue';

const mockAnimal = {
  id: '123',
  name: 'Barnaby',
  gender: 'Boy',
  primaryBreed: 'Golden Retriever',
  age: '2 years',
  // flattened from weightActivity
  weightKg: '30',
  bodyCondition: 'Ideal',
  activityLevel: 'Active',
  // missing required fields
  fussiness: 'Not fussy',
  intolerances: 'None',
  healthConcerns: 'None',
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
    <TodoList />
    <br />
    <div>&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&</div>
    <DefineExposeParent />
    <br />
    <div>&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&</div>
    <PetDetailsOrchestrator :animal="mockAnimal" customer-id="test-123" />
  </main>
</template>
