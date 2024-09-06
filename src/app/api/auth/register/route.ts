import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'
import { type RegisterFormValues } from '@/validators/register'
import { db } from '@/lib/db'

export async function POST (request: Request) {
  try {
    const body: RegisterFormValues = await request.json()

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const userFound = await db.credentials.findFirst({
      where: {
        OR: [{ username: body.username }, { email: body.email }]
      }
    })

    if (userFound) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const user = await db.user.create({
      data: {
        name: body.name,
        lastname: body.lastname,
        Credentials: {
          create: {
            email: body.email,
            password: hashedPassword,
            username: body.username
          }
        }
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    const newError = error as { message: string }

    return NextResponse.json(
      {
        message: newError.message
      },
      {
        status: 500
      }
    )
  }
}
