import { useCallback, useEffect } from 'react';
import { Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { PageLoader } from 'components';
import { userVerifyEmail } from '../../service';
import { selectAuthIsLoading, selectAuthError } from '../../userSlice';

export default function VerifyEmail() {
  const { code = '' } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectAuthIsLoading);
  const verifyError = useAppSelector(selectAuthError);

  const verifyHandler = useCallback(async () => {
    if (!code) return;

    try {
      const data = await dispatch(userVerifyEmail({ code })).unwrap();
      notifications.show({
        color: 'green',
        title: t('verify_email'),
        message: t(data.message),
      });
      navigate(ROUTES.signin);
    } catch (error: unknown) {
      if (typeof error === 'string') {
        notifications.show({
          color: 'red',
          title: t('verify_email'),
          message: t(error as string),
        });
      }
    }
  }, [dispatch, navigate, code, t]);

  useEffect(() => {
    if (code) {
      verifyHandler();
    }
  }, [verifyHandler, code]);

  if (isLoading) return <PageLoader />;
  if (verifyError)
    return (
      <Title order={3} my={rem(20)} ta='center'>
        {t(verifyError)}
      </Title>
    );
  return null;
}
