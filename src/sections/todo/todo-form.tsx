'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { createTodo } from '@/lib/queries'
import { cn } from '@/lib/utils'
import { todoFormSchema, type TodoFormValues } from '@/validators/todo'
import { useRouter } from 'next/navigation'

interface TodoFormProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string
}

export default function TodoForm ({ className, email, ...props }: TodoFormProps) {
  const router = useRouter()
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: 'title 1',
      description: 'description 1'
    },
    mode: 'onChange'
  })

  async function onSubmit (data: TodoFormValues) {
    try {
      await createTodo({ email, description: data.description, title: data.title })

      toast({
        title: 'Success',
        description: 'Created and sent invitation'
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'Could not send invitation'
      })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder="Tu description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>
              crear todo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
