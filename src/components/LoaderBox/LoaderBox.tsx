import { Stack, Title, Loader, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function LoaderBox() {
  const { t } = useTranslation();

  return (
    <Stack align='center'>
      <Loader color='primary' type='dots' size={rem(120)} />
      <Title order={2}>{t('loading')}...</Title>
    </Stack>
  );
}
