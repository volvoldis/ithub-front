import { z } from 'zod';

export const employerCompanySchema = z.object({
  companyName: z.string().min(2),
  companyWebSite: z.string().min(3),
  companyEmployeesCount: z.number(),
  companyOffices: z.string().min(2),
  companyDescription: z.string().min(6),
});
