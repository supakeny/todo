'use server'

import { db } from './db'

async function getUser ({ email }: { email: string }) {
  return await db.credentials.findUnique({
    where: { email }
  })
}

export async function getAllTodoUser ({ email }: { email: string }) {
  const user = await getUser({ email })

  if (!user) throw new Error('User not found')

  return await db.todo.findMany({
    where: { userId: user.id }
  })
}

export async function createTodo ({ email, title, description }: { email: string, description: string, title: string }) {
  try {
    const userDB = await db.user.findFirst({
      where: {
        Credentials: {
          email
        }
      }
    })

    if (!userDB) throw new Error('User not found')

    return await db.todo.create({
      data: {
        description,
        title,
        userId: userDB.id
      }
    })
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}

export async function getAllTodo () {
  return await db.todo.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        include: { Credentials: true }
      }
    }
  })
}
