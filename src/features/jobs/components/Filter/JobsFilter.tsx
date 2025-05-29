import { useTranslation } from 'react-i18next';
import { Group, Stack, Flex, Text, Button } from '@mantine/core';
import { EXPERIENCE_LEVELS } from 'shared/constants';

export default function JobsFilter() {
  const { t } = useTranslation();

  return (
    <Stack gap={12}>
      <Stack gap={10}>
        <Text>Experience level</Text>
        <Flex wrap='wrap' gap={2}>
          {EXPERIENCE_LEVELS.map((l) => (
            <Button key={l}>{l}</Button>
          ))}
        </Flex>
      </Stack>
    </Stack>
  );
}
