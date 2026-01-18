import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const todoSchema = z.object({
  userId: z.number(),
  id: z.coerce.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const todosContract = c.router({
  getTodos: {
    method: 'GET',
    path: '/todos',
    responses: {
      200: z.array(todoSchema),
    },
  },
});

