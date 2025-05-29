import { z } from 'zod';
import { i18n } from 'shared/i18n';

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: i18n.t('sv_password_should_have_at_least_8_characters'),
    }),
    confirmPassword: z.string(),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: i18n.t('passwords_don_not_match'),
      path: ['confirmPassword'],
    },
  );
