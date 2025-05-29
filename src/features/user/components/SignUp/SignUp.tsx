import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { AuthTemplate } from 'components';
import { userRegister } from '../../service';
import { selectAuthIsLoading } from '../../userSlice';

import SignUpForm from './SignUpForm';
import type { SignUpFormValues } from './types';

export default function SignUp() {
  const [successRegister, setSuccessRegister] = useState('');

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const signupHanlder = async (values: SignUpFormValues) => {
    const { firstName, lastName, email, password, role } = values;

    try {
      const data = await dispatch(
        userRegister({ firstName, lastName, email, password, role }),
      ).unwrap();

      setSuccessRegister(data.message);
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('sign_up_error'),
        message: t(error as string),
      });
    }
  };

  return (
    <AuthTemplate title={t('signup')}>
      <Text>
        {t('have_you_already_have_an_account')}?{' '}
        <Anchor component={Link} to={ROUTES.signin}>
          {t('signin')}
        </Anchor>
      </Text>
      {successRegister ? (
        <Text c='secondary' fz='lg' ta='center'>
          {t(successRegister)}
        </Text>
      ) : (
        <SignUpForm submit={signupHanlder} isSubmitting={isLoading} />
      )}
    </AuthTemplate>
  );
}
