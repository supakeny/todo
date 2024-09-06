import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import RegisterAuthForm from '@/sections/auth/register-auth-form'

export default function RegisterView () {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
        <Link href="/" className='absolute left-4 top-4 md:left-8 md:top-8 font-bold'>
          Autoimperio
        </Link>

        <Link href='/auth/login' className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'absolute right-4 top-4  md:right-8 md:top-8 font-bold')}>
          Login
        </Link>
        <div className="p-0">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className='text-center text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1]'>
                Crea tu cuenta en Autoimperio
              </h1>
            </div>
            <RegisterAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
