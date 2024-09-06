'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { loginFormSchema, type LoginFormValues } from '@/validators/login'
import { useBoolean } from '@/hooks/use-boolean'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginAuthForm ({ className, ...props }: LoginAuthFormProps) {
  const router = useRouter()
  const password = useBoolean(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailOrUsername: '',
      password: ''
    },
    mode: 'onChange'
  })

  async function onSubmit (data: LoginFormValues) {
    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (res?.error) {
      alert(res.error)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name='emailOrUsername'
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
            <Button type='submit'>
              Iniciar sesión con correo electrónico
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            <Link href='/' className={buttonVariants()}>
              Home
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
