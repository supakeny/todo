import { z } from 'zod'

export const loginFormSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}
