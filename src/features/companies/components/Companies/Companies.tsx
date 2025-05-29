import { Box, SimpleGrid } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { CardSkeleton, ErrorBox } from 'components';
import CompanyCard from './CompanyCard';
import {
  selectCompanies,
  selectCompaniesIsLoading,
  selectCompaniesError,
} from '../../companiesSlice';

export default function Companies() {
  const companies = useAppSelector(selectCompanies);
  const loading = useAppSelector(selectCompaniesIsLoading);
  const error = useAppSelector(selectCompaniesError);

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <CardSkeleton key={i} />
  ));

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <SimpleGrid cols={{ xs: 2, md: 3, xl: 5 }}>
          {loading
            ? skeletons
            : companies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
