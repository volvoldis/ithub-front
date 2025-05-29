import { Link } from 'react-router-dom';
import {
  Card,
  Text,
  Flex,
  rem,
  Avatar,
  Anchor,
  ActionIcon,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconEye } from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useAppDispatch } from 'store/hooks';
import { NOTIFICATION_TYPES, API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { readNotification } from '../../services';
import { INotification } from '../../types';
import classes from './NotificationCard.module.scss';

type ApplicationProps = {
  notification: {
    job: {
      id: string;
      title: string;
    };
    seeker: {
      avatar: string;
      id: string;
      name: string;
    };
  };
};

function ApplicationNotify({ notification }: ApplicationProps) {
  const { t } = useTranslation();

  return (
    <Flex gap={rem(6)} align='center'>
      <Avatar src={`${API_SERVER}/${notification.seeker.avatar}`} />{' '}
      <Text className={classes.msg}>
        <Anchor
          component={Link}
          to={`${ROUTES.resumes}/${notification.seeker.id}`}
          target='_blank'
          underline='never'
        >
          {notification.seeker?.name}
        </Anchor>{' '}
        {t('applied_to_your_vacancy')}{' '}
        <Anchor
          component={Link}
          to={`${ROUTES.jobs}/${notification.job.id}`}
          target='_blank'
          underline='never'
        >
          {notification.job.title}
        </Anchor>
      </Text>
    </Flex>
  );
}

type NotificationCardProps = {
  notification: INotification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, createdAt, data, isWatched, type } = notification;

  const dispatch = useAppDispatch();

  const watchHandler = async () => {
    try {
      await dispatch(readNotification(_id)).unwrap();
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  let notify = null;

  switch (type) {
    case NOTIFICATION_TYPES.applyToJob:
      notify = <ApplicationNotify notification={data} />;
      break;
    default:
      notify = null;
  }

  return (
    <Card
      shadow='sm'
      radius={0}
      className={`${classes.card} ${!isWatched ? classes.unwatched : ''}`}
    >
      <Flex className={classes.notify}>
        <Flex className={classes.notifyInner}>
          <Text className={classes.time}>{formatDT(createdAt, true)}</Text>
          {notify}
        </Flex>
        {!isWatched && (
          <ActionIcon
            variant='transparent'
            onClick={watchHandler}
            className={classes.icon}
          >
            <IconEye size={30} />
          </ActionIcon>
        )}
      </Flex>
    </Card>
  );
}
