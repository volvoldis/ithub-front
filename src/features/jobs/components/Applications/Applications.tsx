import { Box, SimpleGrid, Title } from '@mantine/core';
import { useEffect } from 'react';
import { CardSkeleton, ErrorBox } from 'components';
import { getMyApplications } from 'features/jobs';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import {
  selectMyApplications,
  selectMyApplicationsIsLoading,
  selectMyApplicationsError,
} from '../../jobsSlice';
import { JobCard } from '../JobCard';

export default function Applications() {
  const applications = useAppSelector(selectMyApplications);
  const loading = useAppSelector(selectMyApplicationsIsLoading);
  const error = useAppSelector(selectMyApplicationsError);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <CardSkeleton key={i} horizontal />
  ));

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <SimpleGrid cols={{ md: 2 }}>
          {loading ? (
            skeletons
          ) : applications?.length > 0 ? (
            applications.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <Title order={3}>{t('you_have_no_applications_yet')}</Title>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}
