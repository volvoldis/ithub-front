import { useEffect } from 'react';
import { Box, Container, Stack, Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Companies, getCompanies } from 'features/companies';
import { useAppDispatch } from 'store/hooks';

function CompaniesPage() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          <Title>{t('companies')}</Title>
          <Companies />
        </Stack>
      </Container>
    </Box>
  );
}

export default CompaniesPage;
