import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import * as trpc from '@trpc/server'
import crypto from 'crypto'
import { getUserFromHeader } from './utils/auth'
import { User } from '.prisma/client'
import { prismaClient } from 'db'

const ADMIN_ROLES = ['ADMIN', 'SUPERADMIN']

export const isAdmin = (userRole: User['role'] | undefined) => {
  return userRole && ADMIN_ROLES.includes(userRole)
}

export const createRouter = () => trpc.router<Context>()

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const user = await getUserFromHeader(req.headers)
  const requestId = crypto.randomBytes(10).toString('hex')

  return {
    headers: req.headers,
    user: user,
    isAdmin: isAdmin(user?.role),
    req: { ...req, id: requestId },
    res,
    prisma: prismaClient,
  }
}

export const protectedRoute = createRouter().middleware(
  async ({ ctx, next }) => {
    console.log('came here', ctx.headers)
    const user = await getUserFromHeader(ctx.headers)
    if (!user) {
      console.log(`Unauthenticated while accesing ${ctx.req.url}`, ctx.headers)
      throw new Error(`Unauthenticated when trying to access ${ctx.req.url}`)
    }
    ctx.user = user
    ctx.isAdmin = isAdmin(user.role)
    return next()
  }
)

export const adminRoute = createRouter().middleware(async ({ ctx, next }) => {
  const user = await getUserFromHeader(ctx.headers)

  if (!user) {
    console.log(`Unauthenticated while accesing ${ctx.req.url}`, ctx.headers)
    throw new Error(`Unauthenticated when trying to access ${ctx.req.url}`)
  }

  if (!isAdmin(user.role)) {
    throw new Error('Unauthorized')
  }

  ctx.user = user
  ctx.isAdmin = true
  return next()
})

export type Context = inferAsyncReturnType<typeof createContext>
