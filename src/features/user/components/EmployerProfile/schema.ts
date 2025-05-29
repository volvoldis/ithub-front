import { z } from 'zod';

export const employerProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string(),
  linkedin: z.string(),
  userPosition: z.string().min(2),
});
