import { createRouter } from "./context";
import { userRouter } from "./user";
import { postRouter } from "./post";

export const appRouter = createRouter()
  .merge("user.", userRouter)
  .merge("post.", postRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
