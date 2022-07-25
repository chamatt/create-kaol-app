import { PrismaClient } from 'db'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

const prisma = new PrismaClient()
export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  return {
    req,
    res,
    prisma,
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
