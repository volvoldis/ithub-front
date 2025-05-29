import { Card, Skeleton, Flex, Stack, rem } from '@mantine/core';
import classes from './CardSkeleton.module.scss';

type CardSkeletonProps = {
  horizontal?: boolean;
};

export default function CardSkeleton({ horizontal }: CardSkeletonProps) {
  return (
    <Card
      shadow='sm'
      padding='sm'
      radius='md'
      withBorder
      className={classes.card}
    >
      {horizontal ? (
        <Flex gap={rem(12)}>
          <Skeleton height={150} width={150} miw={150} />
          <Stack w='100%' gap={rem(6)}>
            <Skeleton height={16} radius='md' width='50%' />
            <Skeleton height={16} radius='md' width='60%' />
            <Skeleton height={16} radius='md' width='70%' />
            <Skeleton height={16} radius='md' />
            <Skeleton height={60} radius='md' />
          </Stack>
        </Flex>
      ) : (
        <Stack gap={rem(6)}>
          <Skeleton height={150} mb={6} />
          <Skeleton height={16} radius='md' />
          <Skeleton height={16} radius='md' />
          <Skeleton height={50} radius='md' width='80%' />
        </Stack>
      )}
    </Card>
  );
}
