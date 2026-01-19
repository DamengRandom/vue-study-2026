import { z } from 'zod';
import { initClient } from '@ts-rest/core';
import { TRPCError } from '@trpc/server';
import { todosContract, todoSchema, updateTodoContract } from '../../ts-rest/todos-contract';
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
  updateTodo: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string(),
      completed: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      console.log('--- tRPC Mutation Triggered ---');
      console.log('Action: updateTodo');
      console.log('Contract Method:', updateTodoContract.updateTodo.method);
      console.log('Payload:', input);

      const client = initClient(updateTodoContract, {
        baseUrl: 'http://localhost:3004',
        baseHeaders: {},
      });

      const res = await client.updateTodo({
        params: { id: input.id },
        body: { title: input.title, completed: input.completed },
      });

      console.log('ts-rest Response Status:', res.status);
      console.log('-------------------------------');

      if (res.status !== 200) {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: 'Failed to update todo',
        });
      }

      return res.body;
    }),
});

export type AppRouter = typeof appRouter;
