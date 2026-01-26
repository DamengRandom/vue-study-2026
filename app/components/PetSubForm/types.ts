import type { FormAsyncValidateOrFn, FormValidateOrFn } from '@tanstack/form-core'
import type { useForm } from '@tanstack/vue-form'
import type { PetFormValues } from '../PetDetails/Refactored/types'

/**
 * DRY REUSABLE VALIDATION ALIASES
 * These capture the repeated constraints used across subforms and the orchestrator.
 */
export type PetSyncV = FormValidateOrFn<PetFormValues> | undefined
export type PetAsyncV = FormAsyncValidateOrFn<PetFormValues> | undefined

/**
 * THE REUSABLE CONTRACT (Any-free & Generic)
 * This type ensures the data is always PetFormValues.
 * We use our aliases to keep the definition clean and readable.
 */
export type PetFormApiGeneric<
  TOnMount extends PetSyncV = undefined,
  TOnChange extends PetSyncV = undefined,
  TOnChangeAsync extends PetAsyncV = undefined,
  TOnBlur extends PetSyncV = undefined,
  TOnBlurAsync extends PetAsyncV = undefined,
  TOnSubmit extends PetSyncV = undefined,
  TOnSubmitAsync extends PetAsyncV = undefined,
  TOnDynamic extends PetSyncV = undefined,
  TOnDynamicAsync extends PetAsyncV = undefined,
  TOnServer extends PetAsyncV = undefined,
  TSubmitMeta = unknown,
> = ReturnType<
  typeof useForm<
    PetFormValues,
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
>
