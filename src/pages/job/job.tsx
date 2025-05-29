import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, rem } from '@mantine/core';
import { ErrorBox, LoaderBox } from 'components';
import {
  selectJobIsLoading,
  selectJobError,
  getJobById,
  JobDetails,
} from 'features/jobs';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function JobPage() {
  const { jobid } = useParams();

  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectJobIsLoading);
  const error = useAppSelector(selectJobError);

  useEffect(() => {
    dispatch(getJobById(jobid!));
  }, [dispatch, jobid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          {error ? (
            <ErrorBox msg={error} />
          ) : loading ? (
            <LoaderBox />
          ) : (
            <JobDetails />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default JobPage;
