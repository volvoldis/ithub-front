import { z } from 'zod';
import { i18n } from 'shared/i18n';

export const signinSchema = z.object({
  email: z.string().email({ message: i18n.t('sv_invalid_email') }),
  password: z.string().min(8, {
    message: i18n.t('sv_password_should_have_at_least_8_characters'),
  }),
});
