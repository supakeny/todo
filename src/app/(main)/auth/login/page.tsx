import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import LoginAuthForm from '@/sections/auth/login-auth-form'
import Link from 'next/link'

export default function LoginPage () {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
      <Link href="/" className='absolute left-4 top-4 md:left-8 md:top-8 font-bold'>
        Autoimperio
      </Link>

      <Link href='/auth/register' className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'absolute right-4 top-4  md:right-8 md:top-8 font-bold')}>
        Sign up
      </Link>
      <div className="p-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
              Iniciar sesión en Autoimperio
            </h1>
          </div>
          <LoginAuthForm />
        </div>
      </div>
    </div>
  )
}
