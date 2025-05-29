import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';
import { Header, Footer } from 'components';
import classes from './Layout.module.scss';

export default function RootLayout() {
  return (
    <Stack className={classes.layout}>
      <Header />
      <Box component='main' className={classes.main}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
