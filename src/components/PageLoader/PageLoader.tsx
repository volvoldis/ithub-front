import { Box, Loader, rem } from '@mantine/core';
import classes from './PageLoader.module.scss';

export default function PageLoader() {
  return (
    <Box className={classes.overlay}>
      <Loader color='primary' size={rem(200)} type='dots' />
    </Box>
  );
}
