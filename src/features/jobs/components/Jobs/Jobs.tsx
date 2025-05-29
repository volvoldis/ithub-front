import { Box, SimpleGrid } from '@mantine/core';

import { CardSkeleton, ErrorBox } from 'components';

import { useAppSelector } from 'store/hooks';
import { JobCard } from '../JobCard';
import {
  selectJobs,
  selectJobsIsLoading,
  selectJobsError,
} from '../../jobsSlice';

export default function Jobs() {
  const jobs = useAppSelector(selectJobs);
  const loading = useAppSelector(selectJobsIsLoading);
  const error = useAppSelector(selectJobsError);

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <CardSkeleton key={i} horizontal />
  ));

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <SimpleGrid cols={{ md: 2 }}>
          {loading
            ? skeletons
            : jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </SimpleGrid>
      )}
    </Box>
  );
}
