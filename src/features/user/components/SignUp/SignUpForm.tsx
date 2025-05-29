import { useForm, zodResolver } from '@mantine/form';
import {
  Box,
  Button,
  TextInput,
  Stack,
  PasswordInput,
  Text,
  Checkbox,
  UnstyledButton,
  Modal,
  Radio,
  Group,
  rem,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { IconLock } from '@tabler/icons-react';
import { ROLES } from 'shared/constants';
import type { SignUpFormValues } from './types';
import { signUpSchema } from './schema';

type SignupFormType = {
  submit: (values: SignUpFormValues) => void;
  isSubmitting: boolean;
};

export default function SignUpForm({ submit, isSubmitting }: SignupFormType) {
  const [visible, { toggle }] = useDisclosure(false);
  const [visibleConfirm, { toggle: toggleConfirm }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { t } = useTranslation();

  const form = useForm<SignUpFormValues>({
    initialValues: {
      role: ROLES.seeker,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },
    validate: zodResolver(signUpSchema),
  });

  const icon = (
    <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  return (
    <>
      <Box component='form' w='100%' onSubmit={form.onSubmit(submit)}>
        <Stack gap={12}>
          <Radio.Group
            name='role'
            value={form.values.role}
            onChange={(value) => form.setFieldValue('role', value)}
          >
            <Group justify='center'>
              <Radio value={ROLES.seeker} label={t('i_am_job_seeker')} />
              <Radio value={ROLES.employer} label={t('i_am_employer')} />
            </Group>
          </Radio.Group>
          <TextInput
            label={t('first_name')}
            placeholder={t('first_name')}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label={t('last_name')}
            placeholder={t('last_name')}
            {...form.getInputProps('lastName')}
          />
          <TextInput
            label='Email'
            placeholder='your@email.com'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label={t('password')}
            placeholder='********'
            leftSection={icon}
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label={t('confirm_password')}
            placeholder='********'
            leftSection={icon}
            visible={visibleConfirm}
            onVisibilityChange={toggleConfirm}
            {...form.getInputProps('confirmPassword')}
          />
          <Checkbox
            label={
              <Text fz='sm'>
                {t('i_accept_the')}{' '}
                <UnstyledButton onClick={open} fz='sm' c='grape'>
                  {t('terms_conditions')}
                </UnstyledButton>
              </Text>
            }
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />
          <Button type='submit' disabled={isSubmitting}>
            {t('signup')}
          </Button>
        </Stack>
      </Box>
      {/* Terms & conditions modal */}
      <Modal opened={opened} onClose={close} title={t('terms_and_conditions')}>
        <Text c='gray' ta='justify'>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of de Finibus Bonorum et (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of
          ethics, very popular during the Renaissance. The first line of Lorem
          Ipsum, Lorem ipsum dolor sit amet, comes from a line in section
          1.10.32.
        </Text>
      </Modal>
    </>
  );
}
