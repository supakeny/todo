import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAuth } from '@/lib/auth-options'
import { getAllTodoUser } from '@/lib/queries'
import TodoForm from '@/sections/todo/todo-form'
import { CheckCircle, CircleX } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage () {
  const user = await getAuth()
  const email = user?.user?.email

  if (!email) throw new Error('User not found')

  const allTodo = await getAllTodoUser({ email })

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
      <Link href='/dashboard' className={buttonVariants()}>
        atras
      </Link>
      <div className="p-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <TodoForm email={email} />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead className="text-right">CreatedAt</TableHead>
              <TableHead className="text-right">UpdatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTodo.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.completed ? <CheckCircle /> : <CircleX />}</TableCell>
                <TableCell className="text-right">{new Date(todo.createdAt).toLocaleString()}</TableCell>
                <TableCell className="text-right">{new Date(todo.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
