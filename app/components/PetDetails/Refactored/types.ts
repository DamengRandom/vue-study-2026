import { z } from 'zod'

/**
 * The single source of truth for our Pet Form structure.
 * We've nested these to prevent field name collisions.
 */
export const PetProfileFormSchema = z
  .object({
    about: z.object({
      name: z.string().min(2, 'Name is required'),
      gender: z.string().min(2, 'Gender is required'),
      primaryBreed: z.string().min(2, 'Primary breed is required'),
      age: z.string().min(1, 'Age is required'),
    }),
    weightActivity: z.object({
      weightKg: z.string().min(1, 'Weight is required'),
      bodyCondition: z.string().min(1, 'Body condition is required'),
      activityLevel: z.string().min(1, 'Activity level is required'),
    }),
    healthDiet: z.object({
      fussiness: z.string().min(1, 'Fussiness is required'),
      intolerances: z.string().min(1, 'Intolerances is required'),
      healthConcerns: z.string().min(1, 'Health concerns is required'),
    }),
  })
  .superRefine((data, ctx) => {
    /**
     * CROSS-SECTION VALIDATION EXAMPLE
     * If Breed is "Chihuahua" but Weight is > 10kg, we trigger an error on the Weight field.
     */
    if (data.about.primaryBreed.toLowerCase() === 'chihuahua' && Number(data.weightActivity.weightKg) > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Chihuahuas usually weigh less than 10kg. Please check.',
        path: ['weightActivity', 'weightKg'],
      })
    }
  })

// Extract the raw TypeScript type from the Zod Schema
export type PetFormValues = z.infer<typeof PetProfileFormSchema>

/**
 * RECALL PATTERN: Conditional Types with infer
 * We use this to "extract" the specific section type from the master PetFormValues.
 */
export type ExtractSection<T, K extends keyof T> = T extends { [P in K]: infer V } ? V : never

// These types are now automatically derived from the main schema.
// If we update the Zod schema above, these update automatically!
export type AboutValues = ExtractSection<PetFormValues, 'about'>
export type WeightActivityValues = ExtractSection<PetFormValues, 'weightActivity'>
export type HealthDietValues = ExtractSection<PetFormValues, 'healthDiet'>

export type GetAnimalByIdOutput = {
  id: string
  name: string
  gender: string
  primaryBreed: string
  age: string
  weightKg: string
  bodyCondition: string
  activityLevel: string
  fussiness: string
  intolerances: string
  healthConcerns: string
}
