import { Container, Stack, Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import NotFoundLogo from 'assets/svg/notFound.svg';
import classes from './NotFound.module.scss';

function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Container size='responsive'>
      <Stack align='center' py={rem(100)} className={classes.page}>
        <NotFoundLogo />
        <Title order={3}>{t('not_found_page')}</Title>
      </Stack>
    </Container>
  );
}

export default NotFoundPage;
