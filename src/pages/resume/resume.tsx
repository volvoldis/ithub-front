import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, rem } from '@mantine/core';
import { ErrorBox, LoaderBox } from 'components';
import {
  selectResumeIsLoading,
  selectResumeError,
  ResumeDetails,
  getResumeById,
} from 'features/resume';

import { useAppDispatch, useAppSelector } from 'store/hooks';

function ResumePage() {
  const { resumeid } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectResumeIsLoading);
  const error = useAppSelector(selectResumeError);

  useEffect(() => {
    if (resumeid) {
      dispatch(getResumeById(resumeid));
    }
  }, [dispatch, resumeid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          {error ? (
            <ErrorBox msg={error} />
          ) : loading ? (
            <LoaderBox />
          ) : (
            <ResumeDetails />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default ResumePage;
