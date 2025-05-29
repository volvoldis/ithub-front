import { useEffect } from 'react';
import { Box, Title, Stack, rem } from '@mantine/core';
import { CardSkeleton, ErrorBox } from 'components';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import {
  selectDocs,
  selectDocsError,
  selectDocsIsLoading,
} from '../../docsSlice';
import { getCompanyDocs } from '../../services';
import { DocItem } from '../DocItem';

export default function DocsList() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const docs = useAppSelector(selectDocs);
  const loading = useAppSelector(selectDocsIsLoading);
  const error = useAppSelector(selectDocsError);

  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <CardSkeleton key={i} horizontal />
  ));

  useEffect(() => {
    dispatch(getCompanyDocs());
  }, [dispatch]);

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <Stack gap={rem(12)}>
          {loading ? (
            skeletons
          ) : docs?.length > 0 ? (
            docs.map((d) => <DocItem key={d._id} document={d} showControls />)
          ) : (
            <Title order={3} ta='center'>
              {t('you_have_no_docs_yet')}
            </Title>
          )}
        </Stack>
      )}
    </Box>
  );
}
