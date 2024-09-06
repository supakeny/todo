import { getServerSession, type AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'

import { db } from './db'

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        emailOrUsername: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) return null

        const user = await db.user.findFirst({
          where: {
            Credentials: {
              OR: [
                { email: credentials?.emailOrUsername },
                { username: credentials?.emailOrUsername }
              ]
            }
          },
          include: { Credentials: true }
        })
        if (!user?.Credentials) throw new Error('Wrong credentials')

        const match = await bcrypt.compare(credentials?.password, user.Credentials.password!)
        if (!match) throw new Error('Wrong credentials')

        return {
          id: user.id,
          name: user.name,
          image: user.avatarUrl,
          email: user.Credentials.email
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
}

export const getAuth = async () => await getServerSession(authOptions)
