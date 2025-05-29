import { useTranslation } from 'react-i18next';
import { Anchor } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { ROUTES } from 'shared/routes';
import { AuthTemplate } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthIsLoading } from '../../userSlice';
import { userResetPassword } from '../../service';

import ResetPasswordForm from './ResetPasswordForm';
import type { ResetPasswordFormValues } from './types';

export default function ResetPassword() {
  const { t } = useTranslation();
  const { code = '' } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const submitHanlder = async (values: ResetPasswordFormValues) => {
    if (!code) return;
    const { newPassword } = values;

    try {
      const data = await dispatch(
        userResetPassword({ code, password: newPassword }),
      ).unwrap();
      notifications.show({
        color: 'green',
        title: t('reset_password'),
        message: t(data.message),
      });
      navigate(ROUTES.signin);
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('reset_password'),
        message: t(error as string),
      });
    }
  };

  return (
    <AuthTemplate title={t('reset_password')}>
      <Anchor component={Link} to={ROUTES.signin}>
        {t('log_in_instead')}
      </Anchor>
      <ResetPasswordForm submit={submitHanlder} isSubmitting={isLoading} />
    </AuthTemplate>
  );
}
