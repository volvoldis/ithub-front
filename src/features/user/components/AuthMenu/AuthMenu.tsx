import { Button, Flex, rem, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLogin2, IconUserPlus } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized } from '../../userSlice';
import classes from './AuthMenu.module.scss';

export default function AuthMenu() {
  const { t } = useTranslation();

  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (!isAuthorized) {
    return (
      <Flex align='center' gap={rem(12)}>
        <Link to={ROUTES.signin}>
          <Button variant='light' className={classes.btn}>
            <IconLogin2 size={22} />
            <Text className={classes.text}>{t('signin')}</Text>
          </Button>
        </Link>
        <Link to={ROUTES.signup}>
          <Button variant='outline' className={classes.btn}>
            <IconUserPlus size={22} />
            <Text className={classes.text}> {t('signup')} </Text>
          </Button>
        </Link>
      </Flex>
    );
  }

  return null;
}
