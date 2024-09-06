import { z } from 'zod'

export const registerFormSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastname: z.string().min(1, 'El apellido es obligatorio'),
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
