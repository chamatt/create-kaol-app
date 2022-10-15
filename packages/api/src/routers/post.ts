import { z } from 'zod'
import { protectedProcedure } from './context'
import { t } from '.././trpc'

export const postRouter = t.router({
  getAll: protectedProcedure.query(async (req) => {
    const { ctx } = req
    return await ctx.prisma.post.findMany({
      include: {
        author: true,
      },
    })
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async (req) => {
      const { ctx, input } = req
      return await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
        include: {
          author: true,
        },
        orderBy: {
          title: 'asc',
        },
      })
    }),
  create: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async (req) => {
      const { input, ctx } = req
      return await ctx.prisma.post.create({
        data: {
          authorId: input.authorId,
          title: input.title,
          content: input.content,
        },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async (req) => {
      const { input, ctx } = req
      return await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
