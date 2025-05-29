import { useEffect } from 'react';
import { Box, Container, Stack, Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { getResumes, Resumes } from 'features/resume';
import { useAppDispatch } from 'store/hooks';

function ResumesPage() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getResumes());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          <Title>{t('candidates')}</Title>
          <Resumes />
        </Stack>
      </Container>
    </Box>
  );
}

export default ResumesPage;
