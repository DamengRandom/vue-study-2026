import { z } from 'zod';
import { initClient } from '@ts-rest/core';
import { TRPCError } from '@trpc/server';
import { todosContract, todoSchema } from '../../ts-rest/todos-contract';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  todos: publicProcedure
    .output(z.array(todoSchema))
    .query(async () => {
      const client = initClient(todosContract, {
        baseUrl: 'http://localhost:3004',
        baseHeaders: {},
      });

      const res = await client.getTodos();

      if (res.status !== 200) {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: 'Failed to fetch todos',
        });
      }

      return res.body;
    }),
});

export type AppRouter = typeof appRouter;
