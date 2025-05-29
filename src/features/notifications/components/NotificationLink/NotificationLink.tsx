import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { notifications } from '@mantine/notifications';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { socket } from 'socket';
import sound from 'assets/sounds/popupApply.mp3';
import { selectUnWatchedCount } from '../../notificationsSlice';
import { getMyNotifications } from '../../services';
import classes from './NotificationLink.module.scss';

type ApplyToJobNotificationType = {
  senderId: string;
  senderName: string;
  jobTitle: string;
};

export default function NotificationLink() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const count = useAppSelector(selectUnWatchedCount);

  const play = () => {
    new Audio(sound).play();
  };

  useEffect(() => {
    dispatch(getMyNotifications());

    function getApplyToJobNotification(data: ApplyToJobNotificationType) {
      notifications.show({
        color: 'red',
        title: t('appply_to_job'),
        icon: <IconBell size={18} />,
        message: `${data.senderName} ${t('applied_to_your_vacancy')}: ${data.jobTitle} `,
      });

      play();
      dispatch(getMyNotifications());
    }

    socket.on('getApplyToJobNotification', getApplyToJobNotification);

    return () => {
      socket.off('getApplyToJobNotification', getApplyToJobNotification);
    };
  }, [dispatch, t]);

  return (
    <Link to={ROUTES.notifications} className={classes.iconLink}>
      <Indicator
        size={count ? 16 : 0}
        inline
        label={count > 0 ? count : undefined}
        color='red'
        offset={6}
      >
        <ActionIcon variant='transparent' size={32} aria-label='Notifications'>
          <IconBell size={28} />
        </ActionIcon>
      </Indicator>
    </Link>
  );
}
