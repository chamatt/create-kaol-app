import { createRouter } from "./context";
import { z } from "zod";

export const postRouter = createRouter()
  .query("get-all", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        include: {
          author: true,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query("get-by-author-id", {
    input: z.object({
      authorId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.findMany({
        where: {
          authorId: input.authorId,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      authorId: z.string(),
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.create({
        data: {
          authorId: input.authorId,
          title: input.title,
          content: input.content,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
