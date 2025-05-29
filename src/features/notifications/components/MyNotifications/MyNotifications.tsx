import { useEffect } from 'react';
import { Box, Title, Stack, rem } from '@mantine/core';
import { CardSkeleton, ErrorBox } from 'components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { NotificationCard } from '../NotificationCard';
import {
  selectMyNotifications,
  selectMyNotificationsLoading,
  selectMyNotificationsError,
} from '../../notificationsSlice';
import { getMyNotifications } from '../../services';

export default function MyNotifications() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectMyNotifications);
  const loading = useAppSelector(selectMyNotificationsLoading);
  const error = useAppSelector(selectMyNotificationsError);

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <CardSkeleton key={i} horizontal />
  ));

  useEffect(() => {
    dispatch(getMyNotifications());
  }, [dispatch]);

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <Stack gap={rem(12)}>
          {loading ? (
            skeletons
          ) : notifications?.length > 0 ? (
            notifications.map((ntf) => (
              <NotificationCard key={ntf._id} notification={ntf} />
            ))
          ) : (
            <Title order={3} ta='center'>
              {t('you_have_no_notifications_yet')}
            </Title>
          )}
        </Stack>
      )}
    </Box>
  );
}
