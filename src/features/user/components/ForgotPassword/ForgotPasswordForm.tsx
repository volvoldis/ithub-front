import { useForm, zodResolver } from '@mantine/form';
import { Box, Button, TextInput, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { forgotPasswordSchema } from './schema';
import type { ForgotPasswordFormValues } from './types';

type ForgotPasswordFormProps = {
  submit: (values: ForgotPasswordFormValues) => void;
  isSubmitting: boolean;
};

export default function ForgotPasswordForm({
  submit,
  isSubmitting,
}: ForgotPasswordFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zodResolver(forgotPasswordSchema),
  });

  return (
    <Box component='form' w='100%' onSubmit={form.onSubmit(submit)}>
      <Stack gap={12}>
        <TextInput
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />
        <Button type='submit' disabled={isSubmitting}>
          {t('send_email')}
        </Button>
      </Stack>
    </Box>
  );
}
