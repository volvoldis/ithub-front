import { Stack, Title, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './ErrorPage.module.scss';

export function ErrorPage(): JSX.Element {
  const { t } = useTranslation();

  const reloadPage = (): void => {
    window.location.reload();
  };

  return (
    <Stack align='center' justify='center' className={classes.page}>
      <Title order={2}>{t('an_unexpected_error_occurred')}</Title>
      <Button onClick={reloadPage}>{t('reload_page')}</Button>
    </Stack>
  );
}
