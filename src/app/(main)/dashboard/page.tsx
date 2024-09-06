import { LogoutButton } from '@/components/logout'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAuth } from '@/lib/auth-options'
import { getAllTodo } from '@/lib/queries'
import { CheckCircle, CircleX } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage () {
  const user = await getAuth()
  const email = user?.user?.email

  if (!email) throw new Error('User not found')
  const allTodo = await getAllTodo()

  if (allTodo.length <= 0) return <h1>No hay todos</h1>

  return (
    <div className='px-4 pt-6 flex flex-col gap-4 w-full items-center justify-center'>
      <div className='w-[80%] flex items-center justify-between'>
        <Link href='/todo' className={buttonVariants()}>
          Crear todo
        </Link>

        <LogoutButton />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">user</TableHead>
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
                <TableCell className="font-medium">{todo.user.Credentials?.username}</TableCell>
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
