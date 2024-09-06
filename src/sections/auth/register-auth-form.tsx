'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useBoolean } from '@/hooks/use-boolean'
import { cn } from '@/lib/utils'

import { registerFormSchema, type RegisterFormValues } from '@/validators/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface RegisterAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterAuthForm ({ className, ...props }: RegisterAuthFormProps) {
  const router = useRouter()
  const password = useBoolean(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange'
  })

  async function onSubmit (newUser: RegisterFormValues) {
    const json = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('🚀 ~ onSubmit ~ json:', json)

    if (json.ok) {
      router.push('/auth/login')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input type={password.value ? 'text' : 'password'} placeholder="Tu contraseña" {...field} />
                      <Button type='button' onClick={password.onToggle} variant="ghost" size="icon" className="absolute rounded-full inset-y-0 right-0 hover:bg-inherit">
                        {
                          password.value
                            ? <Eye className="w-5 h-5" />
                            : <EyeOff className="w-5 h-5 text-gray-500" />
                        }
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>
              Crear cuenta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
