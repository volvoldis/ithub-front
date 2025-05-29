import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Title, rem } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { getJobs, Jobs } from 'features/jobs';

function JobsPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          <Title>{t('jobs')}</Title>
          <Jobs />
        </Stack>
      </Container>
    </Box>
  );
}

export default JobsPage;
