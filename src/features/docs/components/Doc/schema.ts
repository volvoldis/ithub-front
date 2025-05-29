import { z } from 'zod';

export const documentSchema = z.object({
  title: z.string().min(5, {
    message: 'At least 5 letters',
  }),
});
