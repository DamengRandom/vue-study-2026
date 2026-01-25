<script
  setup
  lang="ts"
  generic="
    TOnMount extends PetSyncV,
    TOnChange extends PetSyncV,
    TOnChangeAsync extends PetAsyncV,
    TOnBlur extends PetSyncV,
    TOnBlurAsync extends PetAsyncV,
    TOnSubmit extends PetSyncV,
    TOnSubmitAsync extends PetAsyncV,
    TOnDynamic extends PetSyncV,
    TOnDynamicAsync extends PetAsyncV,
    TOnServer extends PetAsyncV,
    TSubmitMeta
  "
>
import TextField from '../ui/TextField.vue';
import type { PetAsyncV, PetFormApiGeneric, PetSyncV } from './types';

const props = defineProps<{
  form: PetFormApiGeneric<
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >
  isEditing: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-lg text-admin-green-900 font-bold">About (Refactored)</h2>

    <dl class="border-admin-neutral-200 flex flex-col rounded-lg border">
      <!-- Field: Name -->
      <props.form.Field name="about.name">
        <template #default="{ field, state }">
          <div
            class="border-admin-neutral-200 box-content grid min-h-10 min-w-0 grid-cols-[8.75rem_minmax(0,1fr)] gap-3 border-b px-3 py-1.5 last:border-b-0"
          >
            <dt>
              <span class="text-sm text-admin-neutral-700 inline-flex min-h-10 items-center"> Name </span>
            </dt>
            <dd>
              <TextField
                v-if="isEditing"
                :value="field.state.value"
                :error="(state.meta.errors?.[0] as Error | undefined)?.message || undefined"
                :invalid="Boolean(state.meta.errors?.length)"
                :name="field.name"
                hidden-label
                label="Name"
                @blur="field.handleBlur"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <span v-else class="text-sm text-admin-green-900 inline-flex min-h-10 items-center">
                {{ field.state.value }}
              </span>
            </dd>
          </div>
        </template>
      </props.form.Field>

      <!-- Field: Gender -->
      <props.form.Field name="about.gender">
        <template #default="{ field, state }">
          <div
            class="border-admin-neutral-200 box-content grid min-h-10 min-w-0 grid-cols-[8.75rem_minmax(0,1fr)] gap-3 border-b px-3 py-1.5 last:border-b-0"
          >
            <dt>
              <span class="text-sm text-admin-neutral-700 inline-flex min-h-10 items-center"> Gender </span>
            </dt>
            <dd>
              <TextField
                v-if="isEditing"
                :value="field.state.value"
                :error="(state.meta.errors?.[0] as Error | undefined)?.message || undefined"
                :invalid="Boolean(state.meta.errors?.length)"
                :name="field.name"
                hidden-label
                label="Gender"
                @blur="field.handleBlur"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <span v-else class="text-sm text-admin-green-900 inline-flex min-h-10 items-center">
                {{ field.state.value }}
              </span>
            </dd>
          </div>
        </template>
      </props.form.Field>

      <!-- Field: Primary Breed -->
      <props.form.Field name="about.primaryBreed">
        <template #default="{ field, state }">
          <div
            class="border-admin-neutral-200 box-content grid min-h-10 min-w-0 grid-cols-[8.75rem_minmax(0,1fr)] gap-3 border-b px-3 py-1.5 last:border-b-0"
          >
            <dt>
              <span class="text-sm text-admin-neutral-700 inline-flex min-h-10 items-center">
                Primary breed
              </span>
            </dt>
            <dd>
              <TextField
                v-if="isEditing"
                :value="field.state.value"
                :error="(state.meta.errors?.[0] as Error | undefined)?.message || undefined"
                :invalid="Boolean(state.meta.errors?.length)"
                :name="field.name"
                hidden-label
                label="Primary breed"
                @blur="field.handleBlur"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <span v-else class="text-sm text-admin-green-900 inline-flex min-h-10 items-center">
                {{ field.state.value }}
              </span>
            </dd>
          </div>
        </template>
      </props.form.Field>

      <!-- Field: Age -->
      <props.form.Field name="about.age">
        <template #default="{ field, state }">
          <div
            class="border-admin-neutral-200 box-content grid min-h-10 min-w-0 grid-cols-[8.75rem_minmax(0,1fr)] gap-3 border-b px-3 py-1.5 last:border-b-0"
          >
            <dt>
              <span class="text-sm text-admin-neutral-700 inline-flex min-h-10 items-center"> Age </span>
            </dt>
            <dd>
              <TextField
                v-if="isEditing"
                :value="field.state.value"
                :error="(state.meta.errors?.[0] as Error | undefined)?.message || undefined"
                :invalid="Boolean(state.meta.errors?.length)"
                :name="field.name"
                hidden-label
                label="Age"
                @blur="field.handleBlur"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <span v-else class="text-sm text-admin-green-900 inline-flex min-h-10 items-center">
                {{ field.state.value || '–' }}
              </span>
            </dd>
          </div>
        </template>
      </props.form.Field>
    </dl>
  </div>
</template>
