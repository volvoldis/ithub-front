import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, rem } from '@mantine/core';
import { ErrorBox, LoaderBox } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getCompanyById,
  CompanyDetails,
  selectCompanyIsLoading,
  selectCompanyError,
} from 'features/companies';

function CompanyPage() {
  const { companyid } = useParams();

  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectCompanyIsLoading);
  const error = useAppSelector(selectCompanyError);

  useEffect(() => {
    dispatch(getCompanyById(companyid!));
  }, [dispatch, companyid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          {error ? (
            <ErrorBox msg={error} />
          ) : loading ? (
            <LoaderBox />
          ) : (
            <CompanyDetails />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default CompanyPage;
