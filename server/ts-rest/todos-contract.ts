import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const todoSchema = z.object({
  userId: z.number(),
  id: z.coerce.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

export const todosContract = c.router({
  getTodos: {
    method: 'GET',
    path: '/todos',
    responses: {
      200: z.array(todoSchema),
    },
  },
});

export const updateTodoContract = c.router({
  updateTodo: {
    method: 'PATCH',
    path: '/todos/:id',
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    body: z.object({
      title: z.string(),
      completed: z.boolean(),
    }),
    responses: {
      200: todoSchema,
    },
  },
});
