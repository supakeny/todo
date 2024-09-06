import { z } from 'zod'

export const todoFormSchema = z.object({
  title: z.string(),
  description: z.string()
})

export type TodoFormValues = z.infer<typeof todoFormSchema>
