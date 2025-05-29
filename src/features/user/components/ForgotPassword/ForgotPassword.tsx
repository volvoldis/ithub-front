import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { AuthTemplate } from 'components';
import { selectAuthIsLoading } from '../../userSlice';
import { userForgotPassword } from '../../service';
import type { ForgotPasswordFormValues } from './types';

import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPassword() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const forgotPasswordHanlder = async (values: ForgotPasswordFormValues) => {
    const { email } = values;

    try {
      const data = await dispatch(userForgotPassword({ email })).unwrap();

      notifications.show({
        color: 'green',
        title: t('forgot_password'),
        message: t(data.message),
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('forgot_password'),
        message: t(error as string),
      });
    }
  };

  return (
    <AuthTemplate title={t('forgot_password')}>
      <Anchor component={Link} to={ROUTES.signin}>
        {t('log_in_instead')}
      </Anchor>
      <ForgotPasswordForm
        submit={forgotPasswordHanlder}
        isSubmitting={isLoading}
      />
    </AuthTemplate>
  );
}
