import { Box, SimpleGrid } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { CardSkeleton, ErrorBox } from 'components';
import {
  selectResumes,
  selectResumesIsLoading,
  selectResumesError,
} from '../../resumeSlice';
import { ResumeCard } from '../ResumeCard';

export default function Candidates() {
  const resumes = useAppSelector(selectResumes);
  const loading = useAppSelector(selectResumesIsLoading);
  const error = useAppSelector(selectResumesError);

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
            : resumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
              ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
