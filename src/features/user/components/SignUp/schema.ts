import { z } from 'zod';
import { i18n } from 'shared/i18n';

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, {
        message: i18n.t('sv_first_name_should_have_at_least_2_letters'),
      }),
    lastName: z
      .string()
      .trim()
      .min(2, {
        message: i18n.t('sv_last_name_should_have_at_least_2_letters'),
      }),
    email: z.string().email({ message: i18n.t('sv_invalid_email') }),
    password: z
      .string()
      .trim()
      .min(8, {
        message: i18n.t('sv_password_should_have_at_least_8_characters'),
      }),
    confirmPassword: z.string().trim(),
    terms: z.literal(true, {
      errorMap: () => ({
        message: i18n.t('sv_you_must_accept_the_terms_conditions'),
      }),
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: i18n.t('passwords_don_not_match'),
    path: ['confirmPassword'],
  });
