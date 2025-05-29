import { z } from 'zod';

export const vacancySchema = z.object({
  title: z.string().min(5, {
    message: 'At least 5 letters',
  }),
  category: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  domain: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  skills: z.string().array().nonempty(),
  workExperience: z.number(),
  experienceLevel: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  salaryRange: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  country: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  city: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  englishLevel: z.string().min(2, {
    message: 'At least 2 letters',
  }),
  summary: z.string().min(8, {
    message: 'At least 8 letters',
  }),
  companyType: z.string().min(4, {
    message: 'At least 4 letters',
  }),
  employment: z.string().array().nonempty(),
});
