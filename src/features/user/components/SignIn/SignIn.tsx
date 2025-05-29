import { useTranslation } from 'react-i18next';
import { Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { AuthTemplate } from 'components';
import { userLogin } from '../../service';
import { selectAuthIsLoading } from '../../userSlice';

import SignInForm from './SignInForm';
import type { SignInFormValues } from './types';

export default function SignIn() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const signupHanlder = async (values: SignInFormValues) => {
    const { email, password } = values;

    try {
      await dispatch(userLogin({ email, password })).unwrap();
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('sign_in_error'),
        message: t(error as string),
      });
    }
  };

  return (
    <AuthTemplate title={t('signin')}>
      <Text>
        {t('do_not_have_an_account')}? {'  '}
        <Anchor component={Link} to={ROUTES.signup}>
          {t('signup')}
        </Anchor>
      </Text>
      <SignInForm submit={signupHanlder} isSubmitting={isLoading} />
    </AuthTemplate>
  );
}
