import { Stack, Title, Container, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import StillWorkingLogo from 'assets/svg/stillworking.svg';
import classes from './StillWorking.module.scss';

export default function StillWorking() {
  const { t } = useTranslation();

  return (
    <Container size='responsive'>
      <Stack align='center' py={rem(100)} className={classes.box}>
        <StillWorkingLogo />
        <Title order={2} ta='center'>
          {t('this_page_is_still_under_construction')}
        </Title>
      </Stack>
    </Container>
  );
}
