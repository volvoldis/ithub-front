import { z } from 'zod';

export const resumeSchema = z.object({
  position: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  category: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  skills: z.string().array().nonempty(),
  workExperience: z.number(),
  experienceLevel: z.string(),
  salaryExpectations: z.number(),
  country: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  city: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  relocation: z.boolean(),
  englishLevel: z.string().min(2, {
    message: 'At least 2 letters',
  }),
  summary: z.string().min(8, {
    message: 'At least 8 letters',
  }),
  employment: z.string().array().nonempty(),
  dontConsider: z.string().array().nonempty(),
  isPublished: z.boolean(),
});
