import { z } from 'zod';

export const seekerProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string(),
  linkedin: z.string(),
  github: z.string(),
  portfolio: z.string(),
  skype: z.string(),
  telegram: z.string(),
});
